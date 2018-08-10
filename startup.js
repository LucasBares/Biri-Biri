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
	  bot.user.setActivity('n!help V3.1', { type: 'WATCHING', url: 'https://twitch.tv/thekazuo'});
	  console.log("")
	  console.log(`Bot iniciado, con ${bot.users.size} usuarios, en ${bot.guilds.size} servidor/es.`);
	  console.log("")
	});


	bot.on('guildMemberAdd',(gm) => {
	    const channel = getDefaultChannel(gm.guild)
	    if(channel === undefined || channel === null) return
	    channel.send('Bienvenido '+'<@' + gm.id +  '>' + ' <:vohiyo:412474913883160577>, no olvides leer las <#402905862274023435> <:pacman:420980551105642516>');
	});

	bot.on("disconnect", event => {
	  console.log("Disconnected: " + event.reason + " (" + event.code + ")");
	});

};
