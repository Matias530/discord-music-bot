const youtubedl = require('youtube-dl-exec');
const path = require("path");
//const fs = require("fs");

async function downloadMusic(url) {
  try {


    

    const info = await youtubedl(url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true
        });


    const fileName = `${info.title.replace(/[\/\\?%*:|"<>]/g, "-")}.mp3`;
    const filePath = path.resolve(__dirname, "../music", fileName);

    await youtubedl(url, {
      extractAudio: true,
      audioFormat: 'mp3',
      output: filePath,
      noPlaylist: true
    });


    console.log('Descarga completa:', filePath);
    return filePath;
    
  } catch (error) {

    console.error('Error descargando:', error);
    return null;

  }

  

}


module.exports = { downloadMusic };