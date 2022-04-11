require('dotenv').config()
const { TYPING_START, MessageEmbed, Guild } = require('discord.js')

module.exports = (Discord, client, interaction) => {
    
    try {
        if (!interaction.isCommand()) return
        
    } catch(err) {
        console.log(err)
        var errembed = new MessageEmbed()
        errembed.setTitle('**Error 400:**')
        errembed.setDescription(`${err} \n Please try again later`)
        errembed.setColor('RED')
        
        interaction.reply({ embeds: [errembed]})}
}