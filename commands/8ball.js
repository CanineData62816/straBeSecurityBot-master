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
        let responses = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.",
             "Don’t count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.",
             "Outlook not so good.", "Outlook good.", "Reply hazy, try again.", "Signs point to yes.", "Very doubtful.", "Without a doubt.",
             "Yes.", "Yes – definitely.", "You may rely on it.", "01011001 01100101 01110011 00100001", "01001110 01101111 00100001", "Sic est!",
            "Sic non est!"]
        //Make a function that will return a random response from the response array
        let random = responses[Math.floor(Math.random() * responses.length)]
        message.channel.send(random);
        
    }
}