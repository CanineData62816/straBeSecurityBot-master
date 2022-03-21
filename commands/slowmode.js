const Discord = require('discord.js')
const { MessageEmbed, TYPING_START} = require('discord.js');
const allIntents = new Discord.Intents(32767);

module.exports = {
    name: 'slowmode',
    aliases: ['sm', 'slowm', 'smode'],
    permissions: ["MANAGE_MESSAGES"],
    description: 'Changes the slowmode of the current channel',
    execute(client, message, cmd, args, Discord){
        let channel = message.channel
        message.channel.sendTyping()
        let number = parseInt(args[0])
        channel.setRateLimitPerUser(number)
        const Embed = new MessageEmbed()
        .setTitle( ` :white_check_mark:  Successfully changed the slowmode`)
        .setTimestamp()
        .setDescription(`Set the slowmode to ${number}`)
        message.reply( {embeds:[ Embed ]})
        console.log('Ran command "slowmode"')
    }
}