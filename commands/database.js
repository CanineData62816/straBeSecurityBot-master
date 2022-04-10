const Discord = require('discord.js');
const xlsx = require('xlsx');

module.exports = {
    name: 'database',
    aliases: ['db'],
    permissions: ["Permissions.FLAGS.SEND_MESSAGES"],
    description: 'Returns all database information',
    usage: 'database [user]',
    async execute(client, message, cmd, args, Discord){
        if (!args[0]) {
            const discordID = message.member.name;
            var wb = xlsx.readFile('UserData.xlsx');
            var ws = wb.Sheets['Sheet1']
            var data = xlsx.utils.sheet_to_json(ws)
            var found = data.filter(function(item) {return item.name === discordID})
            if(found){
                const embed = new Discord.MessageEmbed()
                .setTitle(`${message.member.displayName}'s Database Information`)
                .addField('Name:', found[0].Username || 'Not Found')
                .addField('Discord ID:', found[0].DiscordID.toString() || 'Not Found')
                .addField('RobloxID:', found[0].RobloxID.toString() || 'Not Found')
                .addField('Points:', found[0].Points.toString() || 'Not Found')
                .addField('Main Rank:', found[0].MainRank || 'Not Found')
                .addField('Security Rank:', found[0].SecurityRank || 'Not Found')
                .addField('SERT Rank:', found[0].SERTRank || 'Not Found')
                .addField('Notes:', found[0].Notes || 'Not Found')

                message.channel.send({embeds: [embed]});
            } else {
                //var points = 0
                let text = `I couldn't find you in the database.`
                message.channel.send(text)
            }
        }
    }
}