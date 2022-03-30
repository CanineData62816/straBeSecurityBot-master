const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });

module.exports = {
    name: 'cmd',
    aliases: ['alias'],
    permissions: ["EXAMPLE"],
    description: '',
    async execute(client, message, cmd, args, Discord){
        
    }
}