const{ SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("luck")
        .setDescription("luck"),
    async execute(interaction) {
        await interaction.reply("luck");
    }
}