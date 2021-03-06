const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const fs = require('fs')
const client = new Discord.Client({ intents: [allIntents] });

module.exports = {
    name: 'gban',
    aliases: ['globalban'],
    permissions: ["Permissions.FLAGS.BAN_MEMBERS"],
    description: 'Global Bans the User from all servers they and the bot are in',
    usage: 'gban [member] <reason>',
    async execute(client, message, cmd, args, Discord){
        try {
            //let user = await message.guild.members.search(args[0])
            let member = message.mentions.members.first();
        if (!member) {
            let users;
            users = client.searchForMembers(message.guild, args[0]);
            if (users.length > 1)
              return message.channel.send(
                "<:error:466995152976871434> Found multiple users! Please be more specific or mention the user instead."
              );
            else if (users.length == 0)
              return message.channel.send(
                "<:error:466995152976871434> That user doesn't seem to exist. Try again!"
              );
            member = users[0];
          }
            if(!member) return message.reply("Please mention a valid member of this server");
            //if(!member.bannable) return message.reply("I cannot ban this member!");
            let reason = args.slice(1).join(" ");
    
            client.guilds.cache.forEach(a => a.members.ban(member, {reason: reason, days: 7}));
            message.channel.send(`Successfully banned ${member}. Reason:${reason}`);
            const Guilds = client.guilds.cache.map(guild => guild.id); 
            
            const target = message.mentions.members.first()
            const warnings = JSON.parse(fs.readFileSync('./warnings.json'))
            if(!warnings[target.id]) warnings[target.id] = [];
            warnings[target.id].push({
                'staff': message.author.id,
                'reason': args[2],
                'timestamp': new Date().toLocaleString(),
                'type': 'gban'
            });
            fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 4))
        } catch(err) {
                //message.reply(`An error has occured, please don't try to rerun the command for multiple minutes.\nIf this issue persists please conatact a developer\nError: ${err}`);
            };
    }
}