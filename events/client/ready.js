module.exports = (Discord, client, messages) => {
    console.time('Ready in');
    console.log(`Startup complete\nLogged in as ${client.user.tag}!\nReady to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`);
    const guildId = '897467911709540353';
    const guild = client.guilds.cache.get(guildId);
    guild.commands.set(client.slashCommands);
    client.user.setActivity('with the Threads of the Universe', { type: 'PLAYING' });
    client.user.setStatus('dnd');
    console.timeEnd('Ready in');


    //create an infinite for loop
    setInterval(() => {
        // generate random number between 1 and list length.
        let activities = [
            'with the Threads of the Universe',
            'with %help',
            'some chess with Hal 9000',
            'with some AI'
        ]
        const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
        const newActivity = activities[randomIndex];
    
        client.user.setPresence({ activities: [{ name: newActivity }], status: 'online' });
      }, 10*1000);
}