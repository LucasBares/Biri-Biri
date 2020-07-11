const message = require('../core/message.js')
const CustomCommand = require('../core/command.js').CustomCommand

exports.getCommands = (clients) => {
	const utils = require('../core/utils.js')
	return [new CustomCommand({
		'name': 'changelog',
		'execute': (msg) => {
			let reply = new message.BaseMessage(msg)
			reply.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
			reply.addField(`Changelog de Biri Biri`, "Versión actual: 4.0 ~ ")
			reply.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
			reply.addField("Versión 4.0", "🎉🎉 Agregada la [pagina web](https://biri-biri-website.herokuapp.com)! 🎉🎉")
			msg.channel.send(reply).catch(console.error)
		}
	})]
}