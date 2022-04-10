
module.exports = {
    name: 'help',
    aliases: ['commands','befehle'],
    permissions: ["Permissions.FLAGS.ADMINISTRATOR"],
    description: 'Gives you a list of all commands and the usage of commands',
    usage: 'help [command]',
    async execute(client, message, cmd, args, Discord){
        const commands = client.commands
        if (!args[0]) {
                //create a function that gets all commands
                //get all commands
                //make a loop that goes through all commands
                //make a message embed
                //add all commands to the embed
                //send the embed
                const embed = new Discord.MessageEmbed()
                .setTitle('Commands')
                .setColor('#0099ff')
                .setDescription('These are all the commands you can use!')
                //make a loop that goes through all objects in the commands array and adds them to the embed
                for(const command of commands.values()){
                    embed.addField(`${command.name.toString()}`, `${command.description.toString()}`, true)
                }
                /*commands.forEach(command => {
                    embed.addField(`${command.name}`, `${command.description}`)
                })
        
                for (i = 0; i < commands.length; i++){
                    let command = commands[i]
                    embed.addField(`${command.name}`, `${command.description}`)
                }*/
        
                 message.channel.send( {embeds: [embed]} )
        } else {
            command = commands.get(args[0])
            if (!command) {
                return message.reply('That is not a valid command!')
            }
            let aliases
            if (command.aliases.length > 0) {
                aliases = command.aliases.join(', ')
            } else {
                aliases = 'None'
            }
            const embed = new Discord.MessageEmbed()
                .setTitle(`${command.name}`)
                .setColor('#0099ff')
                .setDescription(`${command.description}`)
                .addField('Aliases', `${aliases}`)
                .addField('Permissions', `${command.permissions}`)
                .addField('Usage', `${command.usage}`)
                .setFooter(`<>: Optional; []: required\nRequested by ${message.author.username}`)
                
            message.channel.send( {embeds: [embed]} )
        }    
            
        
            
    }
}