const{ ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require("discord.js");
const { playMusic } = require("../../utils/playMusic.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("luck")
        .addStringOption(option =>
            option.setName("url")
                .setDescription("URL del video a reproducir")
                .setRequired(true)
        ),
    async execute(interaction) {

        const url = interaction.options.getString("url");


        try{
            await playMusic(interaction, url);
        } catch(error){
            console.log(error);
        }


        const skip = new ButtonBuilder()
			.setCustomId('stop')
			.setLabel('Stop')
			.setStyle(ButtonStyle.Danger);

        const pause = new ButtonBuilder()
			.setCustomId('pause')
			.setLabel('Pausa')
			.setStyle(ButtonStyle.Primary);

        const next = new ButtonBuilder()
			.setCustomId('next')
			.setLabel('Siguiente')
			.setStyle(ButtonStyle.Primary);
        
        const action = new ActionRowBuilder()
            .addComponents(skip, pause, next);

        await interaction.editReply({
            content: "Reproduciendo",
            components: [action]
        });


    }
}