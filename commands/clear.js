const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });

module.exports = {
    name: 'clear',
    aliases: ['purge'],
    permissions: ["EXAMPLE"],
    description: '',
    async execute(client, message, cmd, args, Discord){
        if (!args[0]) return message.reply('Keine Zahl wurde angegeben')
        if (isNaN(args[0] )) return message.reply('Angegebene Wert ist keine natürliche Zahl zwischen 1 und 99')
        if (args[0] > 99 || args[0] <= 0) return message.reply('Angegebene Wert ist keine natürliche Zahl zwischen 1 und 99')
        const number = parseInt(args[0])
            await message.channel.fetch({limit:args[0]}).then(messages =>{
            message.channel.bulkDelete(number+1);
        })
        const msg = await message.channel.send(`Deleted ${number} messages`)
        //Make a function that waits 5 seconds and then deletes the message
        setTimeout(function(){
            msg.delete();
        }, 5000);
        //setTimeout(() =>{msg.delete(), 25000000000})
    }
}

