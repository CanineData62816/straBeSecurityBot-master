const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });
const xlsx = require('xlsx');

module.exports = {
    name: 'showpoints',
    aliases: ['sp'],
    permissions: ["Permissions.FLAGS.SEND_MESSAGES"],
    description: 'Shows how many security points you have',
    usage: 'showpoints',
    async execute(client, message, cmd, args, Discord){
       try {
            const discordID = message.member.name;
            var wb = xlsx.readFile('UserData.xlsx');
            var ws = wb.Sheets['Sheet1']
            var data = xlsx.utils.sheet_to_json(ws)
            var found = data.filter(function(item) {return item.name === discordID})
            if(found){
                var points = found[0].Points
                let text = `You have ${points} security points`
                message.channel.send(text);
            } else {
                //var points = 0
                let text = `I couldn't find you in the database. Please contact a moderator.`
                message.channel.send(text)
            }
            
       } catch(err) {
        console.warn(err);
        message.channel.send(`Hm, seems something really critical broke while this command was executing, this has been reported and we'll be onto it soon!
        \n
        Please do not attempt to re-run the command for at least a minute, and contact a developer if it's critical.`);
        return
       }
    }
}