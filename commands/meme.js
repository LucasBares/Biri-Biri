const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
function memeCreator(top, bottom, pic){
  top = top || "";
  bottom = bottom || "";
  return "https://memegen.link/custom/"+encodeURI(top)+"/"+encodeURI(bottom)+".jpg?alt="+pic;
}

class MemeCommand extends CustomCommand {
  onPaused(msg) {
    msg.channel.send('Esperate pendejo')
  }

  onInvalidMentions(msg) {
    msg.channel.send("Te falto etiquitar a la gente, pendejo *n!meme @alguien*")
  }
}

exports.getCommands = (clients) => {
  return [new MemeCommand({
    'name': 'meme',
    'cooldown': clients.cooldown({'seconds': 20}),
    'mentions': 1,
    'execute': (msg) => {
      var mentioned = msg.mentions.users.first()
      var mAvatarURL = mentioned.displayAvatarURL
      var pic = mAvatarURL.replace(".png?size=2048", ".png")
      var chop = msg.content.split('>')
      var pichula = chop[1].split('|')
      // TODO: Revisar el handler de no texto;¿
      msg.channel.send({'files': [memeCreator(pichula[0], pichula[1], pic)]});
    }
  })]
}