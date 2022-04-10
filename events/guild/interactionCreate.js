require('dotenv').config()
const { TYPING_START, MessageEmbed, Guild } = require('discord.js')

module.exports = (Discord, client, interaction) => {
    
    try {
        if (!interaction.isCommand()) return
        const audit_log = interaction.guild.channels.cache.find(c => c.name === 'audit-log')
        const { commandName, options } = interaction
        let command
        client.slashCommands.values.forEach(c => {
            if (c.name === commandName) {
                command = c
            } else if (c.aliases && c.aliases.includes(commandName)) {
                command = c
            }
        })
        if (!command) return interaction.reply('Command not found')
        if(command) command.execute(client, interaction, cmd, args, Discord)
    } catch(err) {
        console.log(err)
        var errembed = new MessageEmbed()
        errembed.setTitle('**Error 400:**')
        errembed.setDescription(`${err} \n Please try again later`)
        errembed.setColor('RED')
        
        interaction.reply({ embeds: [errembed]})}
}