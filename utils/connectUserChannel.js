const { joinVoiceChannel } = require('@discordjs/voice');    
    
    
    
async function connectUserChannel(interaction){

    const voice_channel = interaction.member.voice.channel;

    if (!voice_channel) {
        throw new Error(`No estas en un canal de voz`);
    }

    const connection = joinVoiceChannel({
	    channelId: voice_channel.id,
	    guildId: voice_channel.guild.id,
	    adapterCreator: voice_channel.guild.voiceAdapterCreator,
    });

    return connection;

}

module.exports = { connectUserChannel };