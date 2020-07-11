const CustomCommand = require('../core/command.js').CustomCommand
const message = require('../core/message.js')
const utils = require('../core/utils.js')

exports.getCommands = (clients) => {
  return [
    new CustomCommand({
      'name': 'dev',
      'execute': (msg) => {
        let sugestion = utils.getMessage(msg)
        let replyMessage = new message.BaseMessage(msg)
        if(utils.isEmpty(sugestion)) {
          replyMessage.setTitle('Tienes que darnos un mensaje, pendejo')
        } else {
          let ts = new Date().toISOString();
          let content = `@${msg.author.username}(${msg.author.id})[${ts}]`
          let boardId = "5b27dfc25561a398e3c26e3e"
          clients.trello.addCard(sugestion, content, boardId).then( (x) => {} )
          replyMessage.setTitle('Gracias, lo tomaremos en cuenta')
        }
        msg.channel.send(replyMessage);
      }
    })
  ]
}
