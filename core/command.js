const utils = require('./utils.js')
const message = require('./message.js')
const sprintf = require('sprintf-js').sprintf
const db = require('../db/index.js').db

class Command {
  constructor(params) {
    this.name = params.name
    this.alias = params.alias || []
    this.cooldown = params.cooldown
    this.nsfw = params.nsfw || false
    this.mentions = params.mentions
    this._enable = true
    this.prefix = ''
  }

  setPrefix(prefix) {
    this.prefix = prefix
  }

  getFullName() {
    return this.prefix + this.name
  }

  getFullAlias() {
    let prefix = this.prefix
    return this.alias.map(a => prefix + a)
  }

  disable(msg) {
    db.disableCommandForChannel(this.getFullName(), `${msg.channel.id}`)
  }

  enable(msg) {
    db.enableCommandForChannel(this.getFullName(), `${msg.channel.id}`)
  }

  disableUser(msg,id) {
    db.disableCommandForUser(this.getFullName(), `${id}`)
  }

  enableUser(msg,id) {
    db.enableCommandForUser(this.getFullName(), `${id}`)
  }

  isEnable(msg) {
    let name = this.getFullName()
    return db.isCommandEnableForChannel(this.getFullName(), `${msg.channel.id}`)
  }

  onDisable(msg) {
    msg.delete(3000);
    return msg.channel.send("Este comando esta deshabilitado!").then(msg =>{msg.delete(4000)});
  }

  isPaused(msg) {
    if(this.cooldown === undefined) return false
    return !this.cooldown.fire()
  }

  onPaused(msg) {
    // Maybe you want do to something in this case
  }

  isNSFW(msg) {
    // By default only get whatever is defined
    return this.nsfw
  }

  onNSFW(msg) {
    // Maybe you want to do something
    // if the command is NSFW but the channel not
  }

  areMentionsValid(msg) {
    if(this.mentions === undefined) return true
    return this.mentions === utils.countMentions(msg)
  }

  onInvalidMentions(msg) {

  }

  isSelfMention(msg) {
    if(this.mentions === undefined || this.mentions === 0) return false
    if(this.selfError === undefined) return false
    return utils.isFirstMentionAuthor(msg)
  }

  onSelfMention(msg) {

  }

  execute(msg) {
    throw new Error('You must implement this function')
  }
}

class ImageTitleCommand extends Command {
  constructor(params) {
    super(params)
    this.image = params.image
    this.title = params.title
  }

  async execute(msg) {
    let author = utils.getAuthor(msg)
    let replyMessage = new message.BaseMessage(msg)
    let imgUrl = await utils.getContent(this.image)
    let title = utils.getContent(this.title)

    if(utils.isEmpty(imgUrl)) throw new Error('Una imagen es requerida')

    replyMessage.setImage(imgUrl)
    if(!utils.isEmpty(title)) {
      replyMessage.setTitle(sprintf(title, {'author': author}))
    }
    msg.channel.send(replyMessage)
  }
}

class MentionImageTitleCommand extends ImageTitleCommand {
  constructor(params) {
    if(params.mentions === undefined) params.mentions = 1
    super(params)
    this.selfError = params.selfError || 'Aber pendejo, no puedes hacer eso contigo mismo'
  }

  onSelfMention(msg) {
    utils.sendText(msg, this.selfError)
  }

  onInvalidMentions(msg) {
    var title
    if(this.mentions === 1) {
      title = 'Necesito solo una mencion, pendejo'
    } else if(this.mentions >= 2) {
      title = `Necesito exactamente {this.mentions} menciones, pendejo`
    } else {
      title = 'El dev cabron hizo algo mal reportalo'
    }
    utils.sendText(msg, title)
  }

  async execute(msg) {
    let mention = utils.getFirstMention(msg)
    let author = utils.getAuthor(msg)
    let replyMessage = new message.BaseMessage(msg)
    let imgUrl = await utils.getContent(this.image)
    replyMessage.setImage(imgUrl)
    if(utils.isEmpty(imgUrl)) throw new Error('Una imagen es requerida')
    let title = utils.getContent(this.title)
    if(!utils.isEmpty(title)) {
      replyMessage.setTitle(sprintf(title, {'mention': mention, 'author': author}))
    }
    msg.channel.send(replyMessage)
  }
}

class NSFWCommand extends Command {
  constructor(params) {
    params.nsfw = true
    super(params)
    this.imageFunc = params.image
  }

  onNSFW(msg) {
    utils.sendText(msg, 'No seas marrano ese comando es NSFW')
  }

  async execute(msg) {
    let imgUrl = (await this.imageFunc()).url
    let replyMessage = new message.BaseMessage(msg)
    replyMessage.setImage(imgUrl)
    msg.channel.send(replyMessage)
  }
}

class CustomCommand extends Command {
  constructor(params) {
    super(params)
    this.execute = params.execute
  }
}


exports.BaseCommand = Command
exports.ImageTitleCommand = ImageTitleCommand
exports.MentionImageTitleCommand = MentionImageTitleCommand
exports.NSFWCommand = NSFWCommand
exports.CustomCommand = CustomCommand