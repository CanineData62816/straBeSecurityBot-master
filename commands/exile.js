const Discord = require('discord.js');
const { MessageEmbed, TYPING_START} = require('discord.js');
const allIntents = new Discord.Intents(32767);

module.exports = {
    name: 'exile',
    aliases: ['alias'],
    permissions: ["EXAMPLE"],
    description: '',
    async execute(client, message, cmd, args, Discord){
        try {
        //let user = await message.guild.members.search(args[0])
        let member = message.mentions.members.first();
        if(!member) return message.reply("Please mention a valid member of this server");
        if(!member.bannable) return message.reply("I cannot ban this member!");

        member.ban({reason: args[1] });
        message.channel.send(`Successfully banned ${member}. Reason:${args[2]}`);

                    if(!warnings[target.id]) warnings[target.id] = [];
                    warnings[target.id].push({
                        'staff': message.author.id,
                        'reason': args[2],
                        'timestamp': new Date().toLocaleString(),
                        'type': 'exile'
                    });
                    fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 4))
        } catch {
            message.reply(`An error has occured, please don't try to rerun the command for multiple minutes.\nIf this issue persists please conatact a developer`);
        };
    }
};