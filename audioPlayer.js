const { createAudioPlayer } = require('@discordjs/voice');



const audioPlayer = {
    queue: [],
    player: createAudioPlayer(),
};


module.exports = {
    audioPlayer
};