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





client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slashCommands = new Discord.Collection();

['command_Handler', 'event_Handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

async function antiProfanity(message) {
    let profanities = ['niger', 'fucker', 'trump', 'putin', 'niga']
    if (message.author.bot) return;
    //check every message for profanities from the list
    for (let i = 0; i < profanities.length; i++) {
        if (message.content.toLowerCase().includes(profanities[i])) {
            message.delete();
            const msg = await message.channel.send(`${message.author} sent a profanity!\nPlease refrain from using profanities!`);
            setTimeout(function(){
                msg.delete();
            }, 5000);
            return;
        }
    }
}

async function welcomeMessage(member) {
    try{
    member.send(`Welcome to the server!\nTo gain full access to the server do the following:
    
    \`\`\`1. Read the rules in #rules
    2. Join the StraBe Department of Defense group on ROBLOX. You can run ;group for a link.
    3. Run %verify in #checkpoint.\`\`\`
    
    `);
    } catch(err) {
        // console.log(err);
    }
}

client.on('threadUpdate',(oldThread, newThread) => {
    if (newThread.archived === true) {
        return newThread.setArchived(false)
    }
});

client.on('guildMemberAdd', member => {
    welcomeMessage(member);
});

//make a function that checks every message for a swear word
client.on('messageCreate', message => {
    antiProfanity(message);
});

const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

for(const file of slashCommandFiles) {
    const command = require(`./slashCommands/${file}`);
    client.slashCommands.set(command.name, command);
}

const guildId = '897467911709540353';
const guild = client.guilds.cache.get(guildId);


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