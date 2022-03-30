const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });

module.exports = {
    name: '8ball',
    aliases: ['alias'],
    permissions: ["Permissions.FLAGS.SEND_MESSAGES"],
    description: 'Ask the 8ball a question and recieve a mysterious answer',
    usage: '8ball <question>',
    execute(client, message, cmd, args, Discord){
        let response = [
            'Yes',
            'No',
            'Maybe',
            'I don\'t know',
            'Ask again later',
            'I don\'t think so',
            'undefined',
            'Why are you asking me'
        ]
        //Make a function that will return a random response from the response array
        let random = response[Math.floor(Math.random() * response.length)]
        message.channel.send(random);
        
    }
}