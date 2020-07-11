const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
const message = require('../core/message.js');
let ascii = require('asciify');

exports.getCommands = (clients) => {
  return [new CustomCommand({
    'name': 'video',
    'nsfw': true,
    'execute': async (msg) => {
        let searchTerm = utils.getMessage(msg)
        if(utils.isEmpty(searchTerm)) {
          utils.sendText(msg, 'Aber pendejo, necesito algo para buscar')
          return
        }
        const Searcher = new clients.pornsearch()
        let videos = await Searcher.videos()
        let count = videos.length;
        let ad = Math.floor(Math.random() * count) + 1

        if(videos === undefined || videos.length === 0) {
          utils.sendText(msg, `No encontre nada para "${searchTerm}"`)
        } else {
          let reply = new message.BaseMessage(msg)
          reply.setTitle(`Resultado para ${searchTerm}`)
          reply.addField("Titulo: ",`${videos[ad].title}`,true)
          reply.addField("URL", `${videos[ad].url}`,true)
          reply.setColor(0x74D92D)
          msg.channel.send(reply)
        }
    }
  }),

  new CustomCommand({
    'name': 'ascii',
    'execute' : async (msg) =>{
      let searchTerm = utils.getMessage(msg)
      if(utils.isEmpty(searchTerm)) {
        utils.sendText(msg, 'Aber pendejo, dame algo para dibujar')
        return
      }
    let codigo = "```"
    ascii(searchTerm,{font:'standard'},function(err,res){
      msg.channel.send(`${codigo}${res}${codigo}`);
    });
    }
  }),

  new CustomCommand({
    'name': 'invite',
    'execute' : async (msg) =>{
      let reply = new message.BaseMessage(msg)
        reply.setTitle(`🎉🎉 Invitación / Invite 🎉🎉`)
        reply.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
        reply.setDescription("Haz click [Aqui](https://discordapp.com/oauth2/authorize?client_id=429093104474128394&scope=bot&permissions=8), para invitarme a tu servidor!")
        reply.setColor(0x74DF00)
        msg.channel.send(reply)
    }
  }),

  new CustomCommand({
    'name': 'serverinfo',
    'execute': (msg) => {
      let reply = new message.BaseMessage(msg)
      reply.setColor(0x74DF00)
      reply.setThumbnail(msg.guild.iconURL)
      reply.setTitle(`Información de ${msg.guild}`, true)
      reply.addField("Dueño del Servidor", msg.guild.owner, true)
      reply.addField("Usuarios", msg.guild.memberCount, true)
      reply.addField("Creado el ", utils.formatDate(msg.guild.createdAt), true)
      msg.channel.send(reply)
    }
  }),

  new CustomCommand({
    'name': 'userinfo',
    'execute': (msg) => {
      let user = msg.mentions.users.first() || msg.author;
      let join = user.createdAt || msg.author.createdAt;

      let reply = new message.BaseMessage(msg)
      reply.setColor(0x74DF00)
      reply.setThumbnail(user.avatarURL)
      reply.setTitle(`Información de ${user.username}`, true)
      reply.addField(`Nombre Completo:`, user.tag, true)
      reply.addField(`Nickname:`, user.username, true)
      reply.addField("Se unió a discord el: ", utils.formatDate(join), true)
      reply.addField(`Status:`, user.presence.status, true)
      msg.channel.send(reply)
    }
  }),

  new CustomCommand({
    'name': 'choose',
    'execute': (msg) => {
      let items = msg.content.split(" ").slice(1);
      if (items.length <= 1){
        msg.delete();
        return msg.channel.send("Necesito más de un item para elegir, pendejo")
      }
      let choose = items[Math.floor(Math.random() * items.length)];
      msg.channel.send(`**Yo elijo** ${choose} 🎱`);
    }
  }),

  new CustomCommand({
    'name': 'textgif',
    'execute' : async (msg) =>{
      let gifWord = utils.getMessage(msg);
      msg.delete()
      if(utils.isEmpty(gifWord)) {
        utils.sendText(msg, 'Aber pendejo, dame algo para escribir')
        return
      }
      let finalWord = utils.makeGifWord(gifWord)
      let codigo = "```"
      msg.channel.send(`${codigo}${finalWord}${codigo}`);
    }
  }),

  new CustomCommand({
    'name': 'joto',
    'execute': msg => {
      msg.delete()
      msg.channel.awaitMessages(username => username, {
        max: 1,
        time: 300000,
        errors: ['time'],
      }).then((collected) => {
        msg.channel.send(`**${collected.first().author.username}** es joto <:pacman:588510632471429139>`);
      }).catch(() => {
        msg.channel.send('Nadie escribió nada :c');
      })
    }
  }),

  new CustomCommand({
    'name': 'umiyar',
    'execute': msg => {
      msg.delete()
      msg.channel.awaitMessages(username => username, {
        max: 1,
        time: 300000,
        errors: ['time'],
      }).then((collected) => {
        let reply = new message.BaseMessage(msg)
        reply.setTitle(`**${collected.first().author.username}** te umiyaron`)
        reply.setColor(0x74DF00)
        reply.setImage("https://cdn.discordapp.com/emojis/449830856211693578.png")
        msg.channel.send(reply)
      }).catch(() => {
        msg.channel.send('Nadie escribió nada :c')
      })
    }
  })
  ]
}
