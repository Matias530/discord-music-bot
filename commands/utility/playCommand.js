const{ ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require("discord.js");
const { createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { connectUserChannel } = require("../../utils/connectUserChannel.js");
const { downloadMusic } = require("../../utils/downloadMusic");
const { audioPlayer } = require("../../audioPlayer.js");

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

        const { player, queue } = audioPlayer;
        const url = interaction.options.getString("url");

        //mejorar poniendo todo en la lista
        if(player.state.status === AudioPlayerStatus.Playing){
            queue.push(url);
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

            path = await downloadMusic(url);

        } catch(error){
            interaction.editReply(error.message);
            return;
        }

        audioPlayer.lastPath = path;
        const resource = createAudioResource(path);


        connection.subscribe(player);

        player.play(resource);


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