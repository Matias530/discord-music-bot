const{ SlashCommandBuilder } = require("discord.js");
const { connectUserChannel } = require("../../utils/connectUserChannel.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("se une al canal"),
    async execute(interaction) {

        try{

            const connection = await connectUserChannel(interaction);

        } catch(error){
            await interaction.reply(error.message);
            return;
        }

        await interaction.reply(`Ya me uni al canal`);

    }
}