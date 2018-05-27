exports.emotions = function (bot){
const prefix = "n!";
const Discord = require("discord.js");
const client = require("nekos.life");
const cute = require("cuteapi");
const tokens = require("./secrets.json");
const config = require("./commands_config.json");

const neko = new client();
const cuteapi = new cute(tokens.cuteapi);

function famfamoMsg(title, imgUrl) {
	const color = 0xff0000;
	const footer = ["© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png"];
	return new Discord.RichEmbed()
										.setTitle(title)
										.setColor(color)
										.setImage(imgUrl)
										.setFooter(...footer);
}

bot.on("message", msg => {
		let isNSWFChannel = msg.channel.nsfw;
		let author = msg.author.username;
		let hasMention = msg.mentions.members.first() !== undefined;
		let mention = hasMention ? msg.mentions.members.first().user.username : undefined;
		let cmd = msg.content.trim().split(" ")[0];

		let commands = [
			{
				"name": "pat",
			 	"mention": true,
			 	"action": neko.getSFWPat,
			 	"title": `**${mention}** *recibiste un pat de* **${author}**`
			},
			{
				"name": "kiss",
				"mention": true,
				"action": neko.getSFWKiss,
				"title": `**${mention}** recibiste un beso de **${author}**`
			},
			{
				"name": "slap",
				"mention": true,
				"action": neko.getSFWSlap,
				"title": `**${mention}** recibiste un Slap de **${author}**`
			},
			{
				"name": "hug",
				"mention": true,
				"action": neko.getSFWHug,
				"title": `**${mention}** recibiste un Abrazo de **${author}**`
			},
			{
				"name": "poke",
				"mention": true,
				"action": neko.getSFWPoke,
				"title": `**${mention}** recibiste un Poke de **${author}**`
			},
			{
				"name": "feed",
				"mention": true,
				"action": neko.getSFWFeed,
				"title": `**${mention}** te está alimentando **${author}**`
			},
			{
				"name": "meaw",
				"action": neko.getSFWNeko
			},
			{
				"name": "cuddle",
				"mention": true,
				"action": neko.getSFWCuddle,
				"title": `**${mention}** recibiste un Abrazo de **${author}**`
			},
			{
				"name": "flip",
				"init": (msg) => {
					return {"coin": Math.round(Math.random()) };
				},
				"title": (state) => {
					if(state.coin === 1) {
						return `**${author}** te sacaste aguila`;
					}
					else {
						return `**${author}** te sacaste sol`;
					}
				},
				"action": (state) => {
					let aguilaUrl = "https://i.imgur.com/VpcIiTD.gif";
					let solUrl = "https://i.imgur.com/3ECJb4T.gif";
					return {"url": state.coin === 1 ? aguilaUrl : solUrl}
				}
			},
			{
				"name": "tickle",
				"action": neko.getSFWTickle
			},
			{
				"name": "lizzard",
				"action": neko.getSFWLizard
			},
			{
				"name": "foxgirl",
				"action": neko.getSFWFoxGirl
			},
			{
				"name": "nekogif",
				"action": neko.getSFWNekogif
			},
			{
				"name": "kemono",
				"action": neko.getSFWKemonomimi
			},
			{
				"name": "holo",
				"action": neko.getSFWHolo
			},
			{
				"name": "cuteapi",
				"init": (msg) => {
					let cuteapiTypes = config.cuteapi.types;
					let maybeType = msg.content.trim().toLowerCase().split(/\s+/)[1];
					let hasType = cuteapiTypes.some((cuteType) => {
																											return cuteType.name === maybeType
																										});
					let randomType = cuteapiTypes[Math.floor(Math.random()*cuteapiTypes.length)];
					let type = hasType ? {"name": maybeType} : randomType;
			    return {"type": type.name};
				},
				"title": (state) => {
					return `Usted a recibido un(a) ${state.type}`;
				},
				"action": (state) => {
					isNSFW = false;
					return cuteapi.getJSON(state.type, isNSFW);
				}
			}
		];

		let NSFWCommands = [
			{
				"name": "eron",
				"action": neko.getNSFWEroNeko
			},
			{
				"name": "holoero",
				"action": neko.getNSFWHoloEro
			},
			{
				"name": "patas",
				"action": neko.getSFWEroFeet
			},
			{
				"name": "loli",
				"action": neko.getNSFWSmallBoobs
			},
			{
				"name": "pussy",
				"action": neko.getNSFWPussyGif
			},
			{
				"name": "analart",
				"action": neko.getNSFWAnalArts
			},
			{
				"name": "lewdnekogif",
				"action": neko.getNSFWNekoGif
			},
			{
				"name": "pussyart",
				"action": neko.getNSFWPussyArt
			},
			{
				"name": "pwankg",
				"action": neko.getNSFWPussyWankGif
			},
			{
				"name": "eroyuri",
				"action": neko.getNSFWEroYuri
			},
			{
				"name": "erokemo",
				"action": neko.getNSFWEroKemonomimi
			},
			{
				"name": "blowjob",
				"action": neko.getNSFWBlowJob
			},
			{
				"name": "trap",
				"action": neko.getNSFWTrap
			},
			{
				"name": "tits",
				"action": neko.getNSFWTits
			},
			{
				"name": "solo",
				"action": neko.getNSFWGirlSolo
			},
			{
				"name": "solog",
				"action": neko.getNSFWGirlSoloGif
			},
			{
				"name": "anal",
				"action": neko.getNSFWAnal
			},
			{
				"name": "kuni",
				"action": neko.getNSFWKuni
			},
			{
				"name": "random",
				"action": neko.getNSFWRandomHentaiGif
			},
			{
				"name": "lewdkemo",
				"action": neko.getNSFWKemonomimi
			},
			{
				"name": "feet",
				"action": neko.getNSFWFeet
			},
			{
				"name": "ero",
				"action": neko.getNSFWEro
			},
			{
				"name": "cumart",
				"action": neko.getNSFWCumArts
			},
			{
				"name": "cum",
				"action": neko.getNSFWCumsluts
			},
			{
				"name": "classic",
				"action": neko.getNSFWClassic
			},
			{
				"name": "pussy",
				"action": neko.getNSFWPussy
			},
			{
				"name": "futanari",
				"action": neko.getNSFWFutanari
			},
			{
				"name": "boobs",
				"action": neko.getNSFWBoobs
			},
			{
				"name": "keta",
				"action": neko.getNSFWKeTa
			},
			{
				"name": "bj",
				"action": neko.getNSFWBj
			},
			{
				"name": "erok",
				"action": neko.getNSFWEroKitsune
			},
			{
				"name": "hololewd",
				"action": neko.getNSFWHolo
			},
			{
				"name": "yuri",
				"action": neko.getNSFWYuri
			},
			{
				"name": "feetgif",
				"action": neko.getNSFWFeetGif
			},
			{
				"name": "lewdk",
				"action": neko.getNSFWKitsune
			},
			{
				"name": "lewd",
				"action": neko.getNSFWNeko
			},
			{
				"name": "femdom",
				"action": neko.getNSFWFemdom
			},
			{
				"name": "hentai",
				"action": neko.getNSFWHentai
			},
			{
				"name": "les",
				"action": neko.getNSFWLesbian
			}
		];

		function dispatch(commandList, isCommandListNSFW) {
			for (var i = commandList.length - 1; i >= 0; i--) {
				let command = commandList[i];
				let fullCommandName = prefix + command.name;
				let isValidMention = (hasMention && command.mention) || !command.mention;

				if(cmd === fullCommandName) {
					let isCommandEnable = config.commands.some(c => {
						return c.name === command.name && (c.enable === undefined || c.enable === true);
					});
					if(!isCommandEnable) {
						return;
					}

					if(!isNSWFChannel && isCommandListNSFW) {
						(async () => {
							msg.channel.send(`\`${fullCommandName}\` es NSFW solo funciona dentro de un canal NSFW`);
						})();
						return;
					}
					if (isValidMention) {
						(async () => {
							let state = command.init instanceof Function ? command.init(msg) : undefined;
							let imgUrl = (await command.action(state)).url;
							let title = command.title instanceof Function ? command.title(state) : command.title || "";
							msg.channel.send(famfamoMsg(title, imgUrl));
						})();
					}
					else {
						(async () => {
							msg.channel.send(`\`${fullCommandName}\` necesita una mencion`);
						})();
					}

				}

			}
		}

		dispatch(commands, false);
		dispatch(NSFWCommands, true);

	});
}