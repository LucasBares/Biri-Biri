/* --------------

    Negan Bot

--------------- */

const Discord = require("discord.js");
const bot = new Discord.Client({autoReconnect: true, max_message_cache: 0});

const startup = require("./startup.js");
const reaction = require("./reaction.js");
const meme = require("./meme.js");
//const webos = require("./webos.js");
const help = require("./help.js");
const emotions = require("./emotions.js");
const secrets = require("./secrets.json");

startup.startup(bot);
emotions.emotions(bot);
help.help(bot);
meme.meme(bot);
//webos.webos(bot);
reaction.reaction(bot);

bot.login(secrets.discord);
