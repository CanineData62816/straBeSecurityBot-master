const Discord = require('discord.js');
const { MessageEmbed, TYPING_START} = require('discord.js');
const allIntents = new Discord.Intents(32767);
const xlsx = require('xlsx');
const wb = xlsx.readFile('./database.xlsx');
const ws = wb.Sheets['Sheet1'];
const data = xlsx.utils.sheet_to_json(ws);

module.exports = {
    name: 'ban',
    aliases: ['bannish'],
    permissions: ["Permissions.FLAGS.BAN_MEMBERS"],
    description: 'Exiles a member from the current guild',
    usage: 'ban [member] <reason>',
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
        if(!member.bannable) return message.reply("I cannot ban this member!");
        let reason = args.slice(1).join(" ") || "No reason provided";

        member.ban({reason: reason });
        
        message.channel.send(`Successfully banned ${member}. Reason:${reason}`);

                    if(!warnings[target.id]) warnings[target.id] = [];
                    warnings[target.id].push({
                        'staff': message.author.id,
                        'reason': reason,
                        'timestamp': new Date().toLocaleString(),
                        'type': 'ban'
                    });
                    fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 4))
        } catch {
            //message.reply(`An error has occured, please don't try to rerun the command for multiple minutes.\nIf this issue persists please conatact a developer`);
        };
    }
};