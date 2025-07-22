const{ SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("se une al canal"),
    async execute(interaction) {

        const voice_channel = interaction.member.voice.channel;

        if (!voice_channel) {
            await interaction.reply(`No estas en un canal de voz`);
            return;
        }

        const connection = joinVoiceChannel({
	        channelId: voice_channel.id,
	        guildId: voice_channel.guild.id,
	        adapterCreator: voice_channel.guild.voiceAdapterCreator,
        });

        await interaction.reply(`Ya me uni al canal`);

    }
}