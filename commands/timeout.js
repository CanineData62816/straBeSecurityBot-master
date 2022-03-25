const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });

module.exports = {
    name: 'timeout',
    aliases: ['alias'],
    permissions: ["EXAMPLE"],
    description: '',
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
            let member = message.mentions.members.first()
            if(!member.moderatable){return message.reply('Unable to timeout user')}
            member.timeout(args[1]*1000*60, 'They deserved it')
            const embed = new MessageEmbed()
            .setColor('DARK_RED')
            .setTitle('Timeout')
            .setDescription(`${member.user.tag} was put in Timeout for ${time}min`)
            .setTimestamp()
            .setFooter(message.author.tag)
            message.channel.send({embeds:[ embed ]})
            if(!warnings[target.id]) warnings[target.id] = [];
            warnings[target.id].push({
                'staff': message.author.id,
                'reason': args[2],
                'timestamp': new Date().toLocaleString(),
                'type': 'timeout'
            });
            fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 4))
        } catch(err) {
            console.warn(err)
            message.reply(`An error has occured, please don't try to rerun the command for multiple minutes.\nIf this issue persists please conatact a developer\nError: ${err}`)
        }
    }
}