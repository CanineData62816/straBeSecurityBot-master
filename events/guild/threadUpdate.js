require('dotenv').config()
const { TYPING_START, MessageEmbed, Guild } = require('discord.js')

module.exports = (newThread, Discord, client) => {
    if (newThread.archived) {
        newThread.setArchived(false)
    }
}