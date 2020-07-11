class Dispatcher {
  constructor(prefix, bot, clients) {
    this.prefix = prefix
    this.bot = bot
    this.clients = clients
    this.clients.dispatcher = this
    this.commands = {}
  }

  enforceUniqueName(name) {
    if(this.commands.hasOwnProperty(name)) {
      let message = `${name} is duplicated`
      throw new Error(message)
    }
  }

  enforceUniqueCommand(command) {
    this.enforceUniqueName(command.getFullName())
    command.getFullAlias().forEach((c) => this.enforceUniqueName(c))
  }

  add(modulePath) {
    let module = require(modulePath)
    let commands = this.commands
    let prefix = this.prefix
    if(!module.hasOwnProperty('getCommands')) {
      throw new Error(`${modulePath} doesn't have getCommands implemented`)
    }
    module.getCommands(this.clients).forEach(command => {
      command.setPrefix(prefix)
      this.enforceUniqueCommand(command)
      commands[command.getFullName()] = command
      command.getFullAlias().forEach(name => { commands[name] = command; });
    });
  }

  getCommandByName(name) {
    if(name === undefined) return
    return this.commands[this.prefix + name]
  }

  async dispatch(msg) {
    let tags = {'channel': msg.channel.name, 'type': msg.channel.type, 'guild': msg.guild.name}
    this.clients.dogstatsd.increment('discord.message', 1, tags)

    // Are you muted?
    if(this.getCommandByName('mute').checkMuted(msg)) {
      msg.delete()
      return
    }

    // Is this a command?
    // Or if you are a bot, your opinion is not important
    if(!msg.content.startsWith(this.prefix) || msg.author.bot) return

    // match whitespaces - capture the first set of characters - the rest > return lowercase
    let commandName = msg.content.replace(/\s*(\S*).*/,"$1").toLowerCase();

    // If the command doesn't exists then we don't care
    if(!this.commands.hasOwnProperty(commandName)) return

    let command = this.commands[commandName]

    // If you are not enable we don't care
    if(!command.isEnable(msg)) {
      command.onDisable(msg)
      return
    }

    // If you are paused we don't care
    if(command.isPaused(msg)) {
      command.onPaused(msg)
      return
    }

    // If command is NSFW and channel is not
    // we can't execute this
    if(command.isNSFW(msg) && !msg.channel.nsfw) {
      command.onNSFW(msg)
      return
    }

    if(!command.areMentionsValid(msg)) {
      command.onInvalidMentions(msg)
      return
    }

    if(command.isSelfMention(msg)) {
      command.onSelfMention(msg)
      return
    }

    // Get the commands return value
    const answer = await command.execute(msg)
  }

  register() {
    this.bot.on('message', (msg) => this.dispatch(msg))
  }
}

exports.Dispatcher = Dispatcher
