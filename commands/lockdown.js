const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });

module.exports = {
    name: 'lockdown',
    aliases: ['alias'],
    permissions: ["EXAMPLE"],
    description: '',
    execute(client, message, cmd, args, Discord){
        switch(args[0]){
            case 'start': {
                if (args[1] === 'all'){
                    message.channel.guild.channels.cache.forEach(async (channel) => {
                        if (channel.type === 'text'){
                            channel.permissionOverwrites.create(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                            message.reply(`Successfully started a lockdown in this channel`)
                        }
                    })
                } else if (args[1] === 'here'){
                    //Change the permissions of the channel so none can send messages
                    message.channel.permissionOverwrites.create(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                    message.reply(`Successfully started a lockdown in this channel`)
                } else {
                    message.reply(`Please specify if you want to start a serverwide lockdown or a channel lockdown`)
                }
            }
            case 'end': {
                if (args[1] === 'all'){
                    message.channel.guild.channels.cache.forEach(async (channel) => {
                        if (channel.type === 'text'){
                            channel.permissionOverwrites.create(message.channel.guild.roles.everyone, { SEND_MESSAGES: true });
                            message.reply(`Successfully ended a lockdown in this channel`)
                        }
                    })
                } else if (args[1] === 'here'){
                    //Change the permissions of the channel so none can send messages
                    message.channel.permissionOverwrites.create(message.channel.guild.roles.everyone, { SEND_MESSAGES: true });
                    message.reply(`Successfully ended a lockdown in this channel`)
                } else {
                    message.reply(`Please specify if you want to end a serverwide lockdown or a channel lockdown`)
                }
        }
    }
}}