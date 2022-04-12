const xlsx = require('xlsx');
const noblox = require('noblox.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));





module.exports = {
    name: 'verify',
    aliases: ['alias'],
    permissions: [],
    description: 'The command that verifies the user',
    usage: 'verify',
    async execute(client, message, cmd, args, Discord) {
        async function addTooDatabase(member) {         
            const discordID = member.user.username
            var wb = xlsx.readFile('UserData.xlsx');
            var ws = wb.Sheets['Sheet1']
            var data = xlsx.utils.sheet_to_json(ws)
            const securityVerified = message.guild.roles.cache.find(role => role.name === 'Trainee')
            const mainVerified = message.guild.roles.cache.find(role => role.name === 'Roblox verified')
            const points = 0;
            const user = data.filter(function(item) {return item.name === discordID})
            if (!user) {
                if (message.guild.id === '897467911709540353') {
                    message.member.roles.add(securityVerified)
                }
                else if (message.guild.id === '840946604257050694') {
                    message.member.roles.add(mainVerified)
                }
                return;
            } else {
                const response = await fetch(`https://api.blox.link/v1/user/${member.id}`);
                const body = await response.json();

                if(body.status === 'ok') {
                    data.push({Username: discordID, 
                        Points: points, 
                        verified: true, 
                        wallet: '0', 
                        bank: '1000', 
                        RobloxID: body.primaryAccount, 
                        DiscordID: member.id, 
                        MainRank: 'Visitor', 
                        SecurityRank: 'Trainee', 
                        SERTRank: 'Visitor',
                        Notes: ''})
                    xlsx.utils.sheet_to_json(ws, data, {origin: -1})
                    xlsx.writeFile(wb, 'UserData.xlsx')
                }
                        /*const ws = xlsx.utils.json_to_sheet(data)
                        const wb = xlsx.utils.book_new()
                        xlsx.utils.book_append_sheet(wb, ws, 'Sheet1')
                        xlsx.writeFile(wb, 'UserData.xlsx')
                        if (message.guild.id === '897467911709540353') {
                            message.member.roles.add(securityVerified)
                        }
                        else if (message.guild.id === '840946604257050694') {
                            message.member.roles.add(mainVerified)
                        }
                    } else {
                        

                    (async () => {
                        console.log(
                            await getBloxlinkUser("594876019752566789")
                        );
                    })();*/
                    }
            
        }
        addTooDatabase(message.member);
        //return message.reply('This command has not yet been implemented');
        const msg1 = await message.reply('Please continue in your DMs');
        const embed = new Discord.MessageEmbed()
        .setTitle('Verification')
        .setDescription(`Welcome to the server!\nIf ${message.author.username} isn't your roblox username, please reply with your roblox username.\nIf this is your roblox username react with the checkmark.`)
        .setColor('#0099ff')
        .setThumbnail()
        .setTimestamp()
        const msg = await message.author.send({embeds: [embed]});
        msg.react('✅');
        const filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === 'message.author.id';
        msg.awaitReactions({ filter, time: 15_000 })
            .then(msg1.edit('Verification complete!'));
        }
    }

        
    
