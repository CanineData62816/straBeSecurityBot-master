const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });

module.exports = {
    name: 'ping',
    aliases: ['pong'],
    permissions: ["SEND_MESSAGES"],
    description: 'Ping command',
    execute(client, message, cmd, args, Discord){
        message.reply(`🏓Pong! The ping is ${ Date.now() - message.createdTimestamp}ms. The API ping is ${Math.round(client.ws.ping)}ms`);
    }
}