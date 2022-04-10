const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });

module.exports = {
    name: 'kick',
    aliases: ['boot', 'remove'],
    permissions: ["Permissions.FLAGS.KICK_MEMBERS"],
    description: 'Kicks a member of the server',
    usage: 'kick [member] <reason>',
    async execute(client, message, cmd, args, Discord){
        try {
            if (!args[1]) return message.reply('Please state a member and a reason')
        let user = message.mentions.members.first()
        let embed = new Discord.MessageEmbed()
      embed.setTitle('Moderation Act')
      embed.setDescription('Kick')
      embed.addField('Member:', `${user}`, true)
      embed.addField('Moderator:', `${message.author}`, true)
      embed.addField('Reason:', `${args[2]}`, false)
      embed.setColor('DARK_RED')
        if(user) {
            if(user) {
                let reason = args.slice(2).join(' ')
                user.kick(reason).then(() => {
                    message.channel.send({embeds: [embed]})
                    //var channel = client.channels.cache.get('899179323402121277')
                    //var channel1 = client.channels.cache.get('904017109921701908')
                    // channel.send({ embeds: [embed] })
                    // channel1.send({ embeds: [embed] })
            })
        }}
    } catch (error) {
        console.log(error)
    }
    }
}