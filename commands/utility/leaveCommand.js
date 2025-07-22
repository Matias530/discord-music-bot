const{ SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("abandona el canal"),
    async execute(interaction) {

        const connection = getVoiceConnection(interaction.guild.id);
        const memberConnection = interaction.member.voice.channel;

        if(!connection){
            await interaction.reply("no estoy en ningun canal");
            return;
        }

        if(!memberConnection){
            await interaction.reply("no estas en ningun canal");
            return;
        }

        if(memberConnection.id !== connection.joinConfig.channelId){
            await interaction.reply("no estamos en el mismo canal");
            return;
        }

        connection.destroy();

        await interaction.reply("desconectado");
    }
}