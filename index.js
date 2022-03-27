const Discord = require('discord.js')
require('dotenv').config();
const fs = require('fs');
const { Client, Intents, MessageEmbed } = require('discord.js');
const { config } = require('dotenv');
const messageCreate = require('./events/guild/messageCreate');
const client = new Client({ intents: [32767] });
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_Handler', 'event_Handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
});

async function antiProfanity(message) {
    let profanities = ['niger', 'fucker']
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
    /*if (message.content.toLowerCase().includes(profanities)) {
        message.delete();
        const msg = await message.channel.send('Please refrain from sending profanities!');
        setTimeout(function(){
            msg.delete();
        }, 5000);
    */}
}

//make a function that checks every message for a swear word
client.on('messageCreate', message => {
    antiProfanity(message);
});

client.login(token)