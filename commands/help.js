const CustomCommand = require('../core/command.js').CustomCommand
const message = require('../core/message.js')
const utils = require('../core/utils.js')

exports.getCommands = (clients) => {
	return [
		new CustomCommand({
			'name': 'help',
			'execute': (msg) => {
						const reply = new message.BaseMessage(msg)
						reply.setTitle("Comandos")
						reply.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
						reply.setDescription("Para ver todos los comandos, revisa nuestra [pagina web](https://biri-biri-website.herokuapp.com/)!")
						msg.channel.send(reply).catch(console.error)
			}
		}),
	]
}
