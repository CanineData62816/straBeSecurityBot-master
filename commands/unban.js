const Discord = require('discord.js');
const { MessageEmbed, TYPING_START} = require('discord.js');
const allIntents = new Discord.Intents(32767);

module.exports = {
    name: 'unban',
    aliases: ['alias'],
    permissions: ["Permissions.FLAGS.BAN_MEMBERS"],
    description: 'Unbans a user',
    usage: 'unban [user]',
    async execute(client, message, cmd, args, Discord){
        try {
            let member = args[0];  
            if(!member) return message.reply("Please mention a valid member of this server");

            let reason = args.slice(1).join(" ");
            if(!reason) reason = "No reason provided";
            message.guild.members.unban(member, reason);
            message.channel.send(`Successfully unbanned ${member}.`);
        } catch(err) {
            console.log(err);
            message.reply(`An error has occured, please don't try to rerun the command for multiple minutes.\nIf this issue persists please conatact a developer`);
        };
    }
};