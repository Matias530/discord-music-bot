const { createAudioPlayer } = require('@discordjs/voice');



const audioPlayer = {
    queue: [],
    player: createAudioPlayer(),
    lastPath: undefined
};


module.exports = {
    audioPlayer
};