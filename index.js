require('dotenv').config()

const PlaylistSummary = require('youtube-playlist-summary')
const table = require('markdown-table');
var toc = require('markdown-toc');


const config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  PLAYLIST_ITEM_KEY: ['publishedAt', 'title', 'description', 'videoId', 'videoUrl'], // option
}

const ps = new PlaylistSummary(config)

playlists = [
  {
    "name": "ServiceMeshCon EU 2022",
    "id": "PLj6h78yzYM2NhafQWboq__GrDLVugYqAe"
  },
  {
    "name": "PrometheusDay EU 2022",
    "id": "PLj6h78yzYM2NxQ9cO7mUyHBNbvxuHnF3D"
  },
  {
    "name": "KnativeCon EU 2022",
    "id": "PLj6h78yzYM2Mv__LXlfzAAw5WMUTzIvS8"
  },
  {
    "name": "KubeCon + CloudNativeCon Europe 2022",
    "id": "PLj6h78yzYM2MCEgkd8zH0vJWF7jdQ-GRR"
  },
  {
    "name": "GitOpsCon EU 2022",
    "id": "PLj6h78yzYM2PTHsP7RhbRYBT_TDJz5x3M"
  },
  {
    "name": "Cloud Native SecurityCon EU 2022",
    "id": "PLj6h78yzYM2P3qs7Y_QPD4uCgQ4Krsgb3"
  },
  {
    "name": "FluentCon EU 2022",
    "id": "PLj6h78yzYM2PcilkIEOACGi3ua5-ykWam"
  },
];

function getDocument(content) {
  console.log("# KubeCon 2022\n");
  console.log(toc(content).content);
  console.log(content);
}


function markdownTable(title, titleUrl, tableContent) {
  content = ""
  content += `## ${title}\n\n`;
  content += `- [Youtube](${titleUrl}) \n\n`;
  content += table(tableContent);
  content += "\n\n";
  return content;
}

function getPlaylist(playlist) {
  return ps.getPlaylistItems(playlist.id)
    .then((result) => {
      tableContent = [["Name", "Description", "Youtube url", "Published At"]]
      result.items.forEach(row => {
        tableContent.push([row.title, row.description.replace(/(\r\n|\n|\r)/gm, ""), row.videoUrl, row.publishedAt])
      });
      return markdownTable(result.playlistTitle, result.playlistUrl, tableContent);
    })
    .catch((error) => {
      console.error(error)
    })
}


var actions = playlists.map(getPlaylist);
var results = Promise.all(actions);
fullContent = results.then(data => {
  return data.join(" ")
});
fullContent.then(data => {
  getDocument(data)
})


