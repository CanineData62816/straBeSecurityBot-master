const Discord = require('discord.js');
const { MessageEmbed, TYPING_START} = require('discord.js');
const allIntents = new Discord.Intents(32767);

module.exports = {
    name: 'unban',
    aliases: ['alias'],
    permissions: ["EXAMPLE"],
    description: 'Unbans a user',
    async execute(client, message, cmd, args, Discord){
        try {
            let member = message.mentions.members.first() || await message.guild.members.search({query: args[0]});
            if(!member) return message.reply("Please mention a valid member of this server");
            if(!member.bannable) return message.reply("I cannot unban this member!");

            member.unban();
            message.channel.send(`Successfully unbanned ${member}.`);
        } catch(err) {
            console.log(err);
            message.reply(`An error has occured, please don't try to rerun the command for multiple minutes.\nIf this issue persists please conatact a developer`);
        };
    }
};