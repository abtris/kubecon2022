require('dotenv').config()

const PlaylistSummary = require('youtube-playlist-summary')


const config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  PLAYLIST_ITEM_KEY: ['publishedAt', 'title', 'description', 'videoId', 'videoUrl'], // option
}

const ps = new PlaylistSummary(config)

const PLAY_LIST_ID = 'PLj6h78yzYM2NhafQWboq__GrDLVugYqAe';

ps.getPlaylistItems(PLAY_LIST_ID)
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })


