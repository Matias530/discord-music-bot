const { createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { audioPlayer } = require("../audioPlayer");
const { downloadMusic } = require("../utils/downloadMusic.js");
const path = require("node:path");
const fs = require("node:fs");


module.exports = () => {

    const { player, queue} = audioPlayer;

    player.on("stateChange", async (oldState, newState) => {

                

                if(oldState.status !== AudioPlayerStatus.Idle && newState.status === AudioPlayerStatus.Idle){
                    
                    
                    try{
                        const fileName = "music.mp3";
                        const filePath = path.resolve(__dirname, "../music", fileName);
                        fs.unlinkSync(filePath);
                    } catch(error){
                        console.log(error.message);
                    }
    
                    if(queue.length > 0){
    
                        const url = queue.shift();
                        
                        try{
                            const path = await downloadMusic(url);
                            
    
                            const resource = createAudioResource(path);
        
                            player.play(resource);
                        } catch(error){
                            console.log(error);
                        }

    
                    }
    
                }
    
            });
};



