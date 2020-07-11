const getDefaultChannel = async (guild) => {
  // get "original" default channel
  if(guild.channels.has(guild.id))
    return guild.channels.get(guild.id)

  // Check for a "general" channel, which is often default chat
  if(guild.channels.exists("name", "general"))
    return guild.channels.find("name", "general");
  // Now we get into the heavy stuff: first channel in order where the bot can speak
  // hold on to your hats!
  return guild.channels
   .filter(c => c.type === "text" &&
     c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
   .sort((a, b) => a.position - b.position ||
     Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
   .first();
}

exports.startup = function(bot){

	bot.on('ready', () => {
	  bot.user.setActivity('n!help V4.0', { type: 'WATCHING', url: 'https://twitch.tv/thekazuo'});
	  console.log("")
	  console.log(`Bot iniciado, con ${bot.users.size} usuarios, en ${bot.guilds.size} servidor/es.`);
	  console.log("")
  });

  bot.on('error', console.error);

  bot.on('message', (msg) => {
		if (msg.content == "n!globalinfo") {
			const utils = require('./core/utils.js')
			msg.channel.send({embed: {
				color: 3447003,
				author: {
					name: bot.user.username,
					icon_url: bot.user.avatarURL
				},
				title: "Informacion del bot",
				fields: [{
						name: "Cantidad de servidores",
						value: `${bot.guilds.size}`,
						inline: true
					},
					{
						name: "Cantidad de usuarios",
						value: `${bot.users.size}`,
						inline: true
					},
					{
						name: "Voice Chats",
						value: `${bot.channels.size}`,
						inline: true
					},
					{
						name: "Cantidad de Emojis",
						value: `${bot.emojis.size}`,
						inline: true
					},
					{
						name: "Websocket",
						value: `${bot.ping} ms ❤`,
						inline: true
					},
					{
						name: "Uptime",
						value: utils.msToTime(bot.uptime),
						inline: true
					}
				]
			}
		});
		}
	});

	bot.on('guildMemberAdd',(gm) => {
	    const channel = getDefaultChannel(gm.guild)
	    if(channel === undefined || channel === null) return
      try {
	     channel.send('Bienvenido '+'<@' + gm.id +  '>' + ' <:vohiyo:412474913883160577>');
      } catch(err) {
        console.log(channel)
        console.log(err)
      }
	});

	bot.on("disconnect", event => {
	  console.log("Disconnected: " + event.reason + " (" + event.code + ")");
	});

};
