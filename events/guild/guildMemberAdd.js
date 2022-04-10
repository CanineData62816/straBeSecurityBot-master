require('dotenv').config()
const { TYPING_START, MessageEmbed, Guild } = require('discord.js')

module.exports = (Discord, client, member) => {
    try {
        member.send(`Welcome to the server, ${member}!\n To gain access to the rest of the server, please read the rules and follow the steps in #checkpoint.`)
        
    } catch(err) {
        console.log(err)
    }
}