require('dotenv').config()
const { TYPING_START, MessageEmbed, Guild } = require('discord.js')

module.exports = (Discord, client, ldThread, newThread) => {
    if (newThread.archived === true) {
        return newThread.setArchived(false)
    }
}