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

client.login(token)