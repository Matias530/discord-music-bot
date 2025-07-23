const { createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { audioPlayer } = require("../audioPlayer");
const { downloadMusic } = require("../utils/downloadMusic.js");
const fs = require("node:fs");


module.exports = () => {

    const { player, queue, lastPath } = audioPlayer;

    player.on("stateChange", async (oldState, newState) => {

                

                if(oldState.status !== AudioPlayerStatus.Idle && newState.status === AudioPlayerStatus.Idle){
                    
                    try{
                        fs.unlinkSync(lastPath);
                    } catch(error){
                        console.log(error.message);
                    }
    
                    if(queue.length > 0){
    
                        const url = queue.shift();
    
                        const path = await downloadMusic(url);
                        
                        audioPlayer.lastPath = path

                        const resource = createAudioResource(path);
    
                        player.play(resource);
    
                    }
    
                }
    
            });
};



