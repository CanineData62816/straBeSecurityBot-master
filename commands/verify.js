const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });

module.exports = {
    name: 'verify',
    aliases: ['alias'],
    permissions: ["EXAMPLE"],
    description: '',
    execute(client, message, cmd, args, Discord){
        var Excel = require('exceljs');
        const fs = require('fs');
        //search the workbook for a cell with the value from the message.author
        const workbook = fs.readFileSync('./database.xlsx')
            var sheet = workbook.getWorksheet('Sheet1');
            var row = sheet.getRow(1);
            var cell = row.getCell(1);
            var cellValue = cell.value;
            if(cellValue == message.author.username){
                message.channel.send('You have already verified your account!');
            }else{
                message.channel.send('You have not verified your account yet!');
            }
    }
}