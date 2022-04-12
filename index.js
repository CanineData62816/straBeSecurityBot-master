const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const { Client, Intents, MessageEmbed } = require('discord.js');
const { config } = require('dotenv');
const xlsx = require('xlsx');
const messageCreate = require('./events/guild/messageCreate');
const { description } = require('./slashCommands/ping');
const client = new Client({ intents: [32767] });
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;
const audit_log = process.env.AUDIT_LOG
const noblox = require('noblox.js')
let Guild
async function startApp () {
    const currentUser = await noblox.setCookie(process.env.COOKIE) 
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)
    const groupInfo = await noblox.getGroup(5981158);
}
startApp();
console.clear()

client.searchForMembers = function(guild, query) {
    if (!query) return;
    query = query.toLowerCase();
    var a = [];
    var b;
    try {
      b = guild.members.cache.find(x => x.displayName.toLowerCase() == query);
      if (!b) guild.members.cache.find(x => x.user.username.toLowerCase() == query);
    } catch (err) {};
    if (b) a.push(b);
    guild.members.cache.forEach(member => {
      if (
        (member.displayName.toLowerCase().startsWith(query) ||
          member.user.tag.toLowerCase().startsWith(query)) &&
        member.id != (b && b.id)
      ) {
        a.push(member);
      };
    });
    return a;
  };



client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slashCommands = new Discord.Collection();

['command_Handler', 'event_Handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

for(const file of slashCommandFiles) {
    const command = require(`./slashCommands/${file}`);
    client.slashCommands.set(command.name, command);
}

async function commandRegister(commandData) {
    const guildId = '897467911709540353';
    const guild = client.guilds.fetch(guildId);
    guild.commands.create({
        name: 'slowmode',
        description: 'Sets the slowmode of a channel',
        options: [
            {
                name: 'channel',
                description: 'The channel to set the slowmode of',
                type: 'channel'
            },
            {
                name: 'time',
                description: 'The time in seconds to set the slowmode to',
                type: 'number'
            }
        ]
    });
}


client.on('interactionCreate', async interaction => {
    const command = client.slashCommands.get(interaction.commandName.toLowerCase());
    const AuditLog = Guild.channels.cache.get(audit_log)
    if(!audit_log) return;
    const embed = new MessageEmbed()
    .setTitle(`The command ${interaction.commandName} was used`)
    .addField('User:', interaction.member.user.tag)
    .addField('Channel:', interaction.channel.name)
    .addField('Command:', interaction.commandName)
    .setColor('RANDOM')
    command.execute(interaction, client);
    AuditLog.send({embeds: [embed]});
});

client.login(token);