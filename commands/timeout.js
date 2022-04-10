const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });

module.exports = {
    name: 'timeout',
    aliases: ['alias'],
    permissions: ["Permissions.FLAGS.MODERATE_MEMBERS"],
    description: 'Put a member in timeout',
    usage: 'timeout [member] [time] <reason>',
    async execute(client, message, cmd, args, Discord){
        try{
            if(!args[1]) {return message.reply('Please provide a user and how long')}
            let reason
            if(args[2]) {
                reason = args[2]
            } else (
                reason = 'No reason provided'
            )
            //let user = await message.guild.members.search(args[0]) 
            let time = args[1]
            let actualTime
            if (time.endsWith('m')) {
                let actualTime1 = time.slice(0, -1)
                actualTime = actualTime1*1000*60
            } else if (time.endsWith('s')) {
                let actualTime1 = time.slice(0, -1)
                actualTime = actualTime1*1000
            } else if (time.endsWith('h')) {
                let actualTime1 = time.slice(0, -1)
                actualTime = actualTime1*1000*60*60
            } else if (time.endsWith('d')) {
                let actualTime1 = time.slice(0, -1)
                actualTime = actualTime1*1000*60*60*24
            } else {
                return message.reply('Please provide a time in minutes, seconds, hours, or days')
            }
            let member = message.mentions.members.first()
            //if(!member.manageable) return message.reply('Unable to timeout user')
            member.timeout(actualTime, reason.toString())
            const embed = new MessageEmbed()
            .setColor('DARK_RED')
            .setTitle('Timeout')
            .setDescription(`${member.user.tag} was put in Timeout for ${time}`)
            .setTimestamp()
            .setFooter({text: message.author.tag})
            message.channel.send({embeds:[ embed ]})
            /*if(!warnings[target.id]) warnings[target.id] = [];
            warnings[target.id].push({
                'staff': message.author.id,
                'reason': args[2],
                'timestamp': new Date().toLocaleString(),
                'type': 'timeout'
            });
            fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 4))*/
        } catch(err) {
            console.warn(err)
            message.reply(`An error has occured, please don't try to rerun the command for multiple minutes.\nIf this issue persists please conatact a developer\nError: ${err}`)
        }
    }
}