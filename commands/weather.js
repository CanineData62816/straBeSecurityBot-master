const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: [allIntents] });
const Weather = require('weather-js')

module.exports = {
    name: 'weather',
    aliases: ['w'],
    permissions: ["Permissions.FLAGS.SEND_MESSAGES"],
    description: 'Shows the weather',
    usage: 'weather <location>',
    async execute(client, message, cmd, args, Discord){
        let city = message.content.slice(1+cmd.length)
      if(!city) return message.reply('No city or postal code was specified')
        Weather.find({search: city, degreeType: 'C'}, function(err, result) {
            if(err) console.log(err);
          
      var location = result[0].location;
      var current = result[0].current;

      var warning = (`${location.alert}` || "No warnings");

      var embedColour;
      if (current.temperature < 0) {
        embedColour = "#addeff";
      }else if (current.temperature < 20) {
        embedColour = "#4fb8ff";
      }else if (current.temperature < 26) {
        embedColour = "#ffea4f";
      }else if (current.temperature < 31) {
        embedColour = "#ffa14f"
      } else {
        embedColour = "#ff614f"
      };

      embed = new Discord.MessageEmbed();
      embed.setAuthor(`Weather for ${location.name}:`)
      embed.setDescription(`• **Condition:** ${current.skytext}\n• **Temperature:** ${current.temperature}°C\n• **Feels like:** ${current.feelslike}°C\n• **Humidity:** ${current.humidity}%\n• **Wind:** ${current.winddisplay}\n• **Warnings:** ${warning}`)
      embed.setThumbnail(current.imageUrl)
      embed.setFooter(`Last updated at ${current.observationtime} ${current.date}`)
      embed.setColor(embedColour)
      
      message.channel.send({ embeds: [embed] })
    }
    )
    }
}



