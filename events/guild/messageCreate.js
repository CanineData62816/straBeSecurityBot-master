require('dotenv').config()
const { TYPING_START, MessageEmbed, Guild } = require('discord.js')

module.exports = (Discord, client, message) => {
    
    try {const prefix = process.env.PREFIX
    if(!message.content.startsWith(prefix) || message.author.bot) return
    const audit_log = message.guild.channels.cache.find(c => c.name === 'audit-log')

    const args = message.content.slice(prefix.length).split(/ +/)
    const cmd = args.shift().toLowerCase()
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd))
    if (!command) return message.reply('Command not found')

    const validPermissions = [
        'Permissions.FLAGS.CREATE_INSTANT_INVITE', 'Permissions.FLAGS.KICK_MEMBERS',
        'Permissions.FLAGS.BAN_MEMBERS',           'Permissions.FLAGS.ADMINISTRATOR',
        'Permissions.FLAGS.MANAGE_CHANNELS',       'Permissions.FLAGS.MANAGE_GUILD',
        'Permissions.FLAGS.ADD_REACTIONS',         'Permissions.FLAGS.VIEW_AUDIT_LOG',
        'Permissions.FLAGS.PRIORITY_SPEAKER',      'Permissions.FLAGS.STREAM',
        'Permissions.FLAGS.VIEW_CHANNEL',          'Permissions.FLAGS.SEND_MESSAGES',
        'Permissions.FLAGS.SEND_TTS_MESSAGES',     'Permissions.FLAGS.MANAGE_MESSAGES',
        'Permissions.FLAGS.EMBED_LINKS',           'Permissions.FLAGS.ATTACH_FILES',
        'Permissions.FLAGS.READ_MESSAGE_HISTORY',  'Permissions.FLAGS.MENTION_EVERYONE',
        'Permissions.FLAGS.USE_EXTERNAL_EMOJIS',   'Permissions.FLAGS.VIEW_GUILD_INSIGHTS',
        'Permissions.FLAGS.CONNECT',               'Permissions.FLAGS.SPEAK',
        'Permissions.FLAGS.MUTE_MEMBERS',          'Permissions.FLAGS.DEAFEN_MEMBERS',
        'Permissions.FLAGS.MOVE_MEMBERS',          'Permissions.FLAGS.USE_VAD',
        'Permissions.FLAGS.CHANGE_NICKNAME',       'Permissions.FLAGS.MANAGE_NICKNAMES',
        'Permissions.FLAGS.MANAGE_ROLES',          'Permissions.FLAGS.MANAGE_WEBHOOKS',
        'Permissions.FLAGS.MANAGE_EMOJIS',         'Permissions.FLAGS.MODERATE_MEMBERS'
      ]
    
      if(command.permissions.length){
        let invalidPerms = []
        for(const perm of command.permissions){
          if(!validPermissions.includes(perm)){
            return console.log(`Invalid Permissions ${perm}`);
          }
          if(!message.member.permissions.has([perm])){
            invalidPerms.push(perm);
          }
        }
        if (invalidPerms.length){
          return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
        }
      }


    message.channel.sendTyping()
    if(command) command.execute(client, message, cmd, args, Discord)
    console.log(`Ran command ${command.name}`)
    const embed = new MessageEmbed()
    .setTitle(`The command ${cmd} was used`)
    .addField('User:', message.member.user.tag)
    .addField('Channel:', message.channel.name)
    .addField('Command:', cmd)
    .setColor('GREEN')
    audit_log.send({embeds: [embed]})
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