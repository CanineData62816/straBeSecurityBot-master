const { REST } = require('@discordjs/rest');
//const { client } = require('../index.js');
const { Routes } = require('discord-api-types/v9');
const { Collection } = require('discord.js');
const Discord = require('discord.js');
require('dotenv').config();
const token = process.env.TOKEN;
const fs = require('node:fs');

module.exports = () => {

const slashCommands = []
client.slashCommands = new Collection()
const commandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '897478105185259530';
const guildId = '897467911709540353';

for (const file of commandFiles) {
	const command = require(`./slashCommands/${file}`);
	slashCommands.push(command.data.toJSON());
	client.slashCommands.set(command.data.name, command);
}

client.on('ready', () => {
	const rest = new REST({ version: '9' }).setToken(token);

	(async() => {
		try{
			if(process.env.ENV === 'production') {
				await rest.put(Routes.applicationCommands(clientId), {
					body: slashCommands
				});
				console.log('Successfully registered slash commands globally!');
			} else {
				await rest.put(Routes.applicationCommands(clientId, guildId), {
					body: slashCommands
				});
				console.log('Successfully registered slash commands locally!');
			}
	} catch(err) {
		console.log(err);
	}
});
});




/*(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId, guildId), {
				body: slashCommands
			}
		);
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
};
*/
};