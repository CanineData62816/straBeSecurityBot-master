module.exports = {
    name: 'ping',
    description: 'Returns the bots ping',
    options: [],
    async execute(interaction, client) {
        const ping = await interaction.reply({
            content: `🏓 Pong! \nThe ping is **${ Date.now() - interaction.createdTimestamp}ms**. The API ping is **${Math.round(client.ws.ping)}ms**`,
            ephemeral: true
        });
    
    }
}
