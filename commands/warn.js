const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });
const fs = require('fs')

module.exports = {
    name: 'warn',
    aliases: [],
    description: 'Warn command',
    permissions: ["KICK_MEMBERS"],
     execute(client, message, cmds, args, Discord){
        if(!args[0]) return message.reply('⚠️ Error: 404 ⚠️')
        if(!message.mentions.users.first()) return message.reply('⚠️ Error: 404 ⚠️')

        const
            target = message.mentions.users.first()
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor({name:'Warnings'})
                .setFooter({text:'Warning system'})
                .setTimestamp()
            warnings = JSON.parse(fs.readFileSync('./warnings.json'))

            switch(args[0].toLowerCase()){
                case 'add':
                    const reason = args[2] ? args.slice(2).join(' ') : 'No reason given'

                    if(!warnings[target.id]) warnings[target.id] = [];
                    warnings[target.id].push({
                        'staff': message.author.id,
                        'reason': reason,
                        'timestamp': new Date().toLocaleString(),
                        'type': 'warning'
                    });
                    fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 4))
                
                    embed.setDescription(
                        `<@${target.id}> was warned by ` +
                        `<@${message.author.id}> \n\nReason: ${reason}`  
                    )

                    break
                case 'remove':
                    warnings[target.id].splice(args[2]-1, 1)
                    fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 4))

                    embed.setDescription(
                        `A warning was removed from <@${target.id}>`
                    )

                    break

                case 'check':
                    const prettyWarnings =
                        warnings[target.id].length > 0 ?
                            warnings[target.id].map((warning, index) => 
                                `${index+1}: Warning from <@${warning.staff}> on ` +
                                `${warning.timestamp}\nReason: ${warning.reason}`
                            )
                        : ['This Person has no warnings']

                    embed.setDescription(prettyWarnings.join('\n\n'))
                    break

                default: 
                        return message.channel.send(`${args[0]} is not a command`)
            }

            return message.channel.send({ embeds: [embed]})
    }
}