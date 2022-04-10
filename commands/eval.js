const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });

module.exports = {
    name: 'eval',
    aliases: ['run', 'execute', 'evaluate', 'compile', 'compilecode'],
    permissions: ["Permissions.FLAGS.ADMINISTRATOR"],
    description: 'Runs specified code',
    usage: 'eval [code]',
    execute(client, message, cmd, args, Discord){
        const code = args.join(' ');
        try {
            let evaled = eval(code);
            if (typeof evaled !== 'string')
                evaled = require('util').inspect(evaled);
            //message.channel.send((evaled), {code:'xl'});
            message.delete()
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\``);
        }
    }
}