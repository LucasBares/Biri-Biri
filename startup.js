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
  
  bot.on("message", async msg => {
    if (msg.content.startsWith("n!botinfo")){
    let taeko = "274159725967572992";
    let raz = "357008976052879371";
    let akuma = "250044591686811669";

    if(taeko || raz || akuma){
      const embed = new Discord.RichEmbed()
      .setColor(0x74DF00)
      .setTitle(`Información de ${msg.guild}`, true)
      .setDescription(`El bot se encuentra en ${bot.guild.size}`)
      .addField("El bot cuenta con ", `${bot.users.size} usuarios`, true)
      .addField("En",  `${bot.channels.size} canales`, true)
      msg.channel.send({embed});
      } else {
      msg.delete(3000)
      msg.channel.send("Lo siento, solo el ownership team del bot puede ver este mensaje").then(msg => {msg.delete(3000)});
      }
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
