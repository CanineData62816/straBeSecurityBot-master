require('dotenv').config()
const { TYPING_START, MessageEmbed, Guild } = require('discord.js')
const fs = require('fs')

module.exports = (Discord, client, member) => {
    try {
        member.send(`Welcome to the server, ${member}!\n To gain access to the rest of the server, please read the rules and follow the steps in #checkpoint.`)
        let warnings = JSON.parse(fs.readFileSync('./warnings.json'))
        if (!warnings[member.id].length > 0) return
        warnings[member.id].forEach(warning => {
            if (warning.type === 'exile') {
                member.send(`You have been exiled from the server for ${warning.reason}\nIf you wish to appeal you can do so here: https://discord.gg/3YuJXQzszr`)
                setTimeout(() => {
                    return member.kick({reason: 'Exiled'})
                    }, 10000)
                
            }
        })
    } catch(err) {
        console.log(err)
    }
}