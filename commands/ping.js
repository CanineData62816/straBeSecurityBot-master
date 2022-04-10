const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });

module.exports = {
    name: 'ping',
    aliases: ['pong', 'ping', 'checkstats'],
    permissions: ["Permissions.FLAGS.SEND_MESSAGES"],
    description: 'Ping command',
    usage: 'ping',
    options: [],
    execute(client, message, cmd, args, Discord){
        //Get the current ping of the bot
        const ping = Math.round(client.ws.ping);
        //Send the ping to the channel
        //message.channel.send(`🏓Pong! The current ping is ${ping}ms`);
        message.reply(`🏓Pong! The ping is **${Math.abs(Date.now() - message.createdTimestamp)}ms**. The API ping is **${Math.round(client.ws.ping)}ms**`);
    }
}