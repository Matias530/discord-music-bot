const{ ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require("discord.js");
const { createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { connectUserChannel } = require("./connectUserChannel.js");
const { downloadMusic } = require("./downloadMusic");
const { audioPlayer } = require("../audioPlayer.js");


async function playMusic(interaction, url) {
    
    const { player, queue } = audioPlayer;
    
    queue.push(url);


    if(player.state.status === AudioPlayerStatus.Playing){
        await interaction.reply("añadido a la lista");
        return;
    }
    
    await interaction.deferReply();
    
            
    
    let path = undefined;
    let connection = undefined;
    
    try{
        connection = await connectUserChannel(interaction);
    } catch(error){
        await interaction.editReply(error.message);
        return;
    }
    


    try{
    
        path = await downloadMusic(queue.shift());
    
    } catch(error){
        interaction.editReply(error.message);
        return;
    }
    
    const resource = createAudioResource(path);
    
    
    connection.subscribe(player);
    
    player.play(resource);
}

module.exports = {
    playMusic
};