require('dotenv').config()
const { TYPING_START, MessageEmbed, Guild } = require('discord.js')

module.exports = (Discord, client, message) => {
    
    try {const prefix = process.env.PREFIX
    if(!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const cmd = args.shift().toLowerCase()
    const command = client.commands.get(cmd) || client.commands.find((a) => a.alisases && a.alisases.includes(cmd))
    if (!command) return message.reply('Command not found')

    //const validPermissions = [
    //    "CREATE_INSTANT_INVITE",
    //    "KICK_MEMBERS",
    //    "BAN_MEMBERS",
    //    "ADMINISTRATOR",
    //    "MANAGE_CHANNELS",
    //    "MANAGE_GUILD",
    //    "ADD_REACTIONS",
    //    "VIEW_AUDIT_LOG",
    //    "PRIORITY_SPEAKER",
    //    "STREAM",
    //    "VIEW_CHANNEL",
    //    "SEND_MESSAGES",
    //    "SEND_TTS_MESSAGES",
    //    "MANAGE_MESSAGES",
    //    "EMBED_LINKS",
    //    "ATTACH_FILES",
    //    "READ_MESSAGE_HISTORY",
    //    "MENTION_EVERYONE",
    //    "USE_EXTERNAL_EMOJIS",
    //    "VIEW_GUILD_INSIGHTS",
    //    "CONNECT",
    //    "SPEAK",
    //    "MUTE_MEMBERS",
    //    "DEAFEN_MEMBERS",
    //    "MOVE_MEMBERS",
    //    "USE_VAD",
    //    "CHANGE_NICKNAME",
    //    "MANAGE_NICKNAMES",
    //    "MANAGE_ROLES",
    //    "MANAGE_WEBHOOKS",
    //    "MANAGE_EMOJIS"
    //]

    //if(command.permissions.length){
    //    let invalidperms = []
    //    for(const perm of command.permissions){
    //       if(!validPermissions.includes(perm)){
    //            return console.log('Invalid Permission')
    //        }
    //        if(!message.member.permissions.has(perm)) {
    //            invalidperms.push(perm)
    //            break
    //        }
    //    }
    //    if (invalidperms.length){
    //        return message.reply(`Du darfst dieser Befehl nicht benutzen`)
    //    }
    //}

    message.channel.sendTyping()
    if(command) command.execute(client, message, cmd, args, Discord)
    console.log(`Ran command ${command.name}`)
}

    catch(err) {
        message.channel.sendTyping()
        console.log(err)
        var errembed = new MessageEmbed()
        errembed.setTitle('**Error 400:**')
        errembed.setDescription(`${err} \n Please try again later`)
        errembed.setColor('RED')
        
        message.reply({ embeds: [errembed]})}
}