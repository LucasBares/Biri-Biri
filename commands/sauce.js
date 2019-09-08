const CustomCommand = require('../core/command.js').CustomCommand
const message = require('../core/message.js')
const utils = require('../core/utils.js')
const Client = require('node-rest-client').Client
const client = new Client()

exports.getCommands = (clients) => {
  return [
    new CustomCommand({
      'name': 'sauce',
      'alias': 'salsa',
      'nsfw': true,
      'execute': (msg) => {
        let nuclearCode = utils.getMessage(msg)
        let replyMessage = new message.BaseMessage(msg)
        if(!(/^\d+$/.test(nuclearCode))) {
          replyMessage.setTitle('Tienes que darnos un codigo nuclear, pendejo')
          msg.channel.senpnd(replyMessage)
        } else {
          // https://hitomi.la/galleries/1476167.html
          // https://nhentai.net/g/283515/
          
          let sauceFun = (name, url, nuclearCode) => {
            let params = {'url': hitomi_url, 'resolveWithFullResponse': true}
            clients.request(params).then((response) => {
              if(response.statusCode == 200) {
                replyMessage.setTitle(`Salsa ${url}`)
                msg.channel.send(replyMessage)
              } else {
                replyMessage.setTitle(`(${response.statusCode}) Salsa ${nuclearCode} no encontrada en ${name}`)
                msg.channel.send(replyMessage)
              }
            }).catch(e => {
                replyMessage.setTitle(`Salsa ${nuclearCode} no encontrada en ${name}`)
                msg.channel.send(replyMessage)
            })
          }
          let hitomi_url = `https://hitomi.la/galleries/${nuclearCode}.html`
          let nhentai_url = `https://nhentai.net/g/${nuclearCode}/`

          sauceFun('hitomi.la', hitomi_url, nuclearCode)
          sauceFun('nhentai', nhentai_url, nuclearCode)
        }
      }
    })
  ]
}
