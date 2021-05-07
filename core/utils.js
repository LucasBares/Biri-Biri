const message = require('./message.js')

function isEmpty(string) {
  return string === undefined || string === null || string.trim() === ''
}

function getAuthor(msg) {
  return msg.author.username
}

function getFirstMention(msg) {
  try { return msg.mentions.members.first().user.username; } catch(e) { return null; } 
}

function getFirstMentionID(msg) {
  try { return msg.mentions.members.first().user.id; } catch(e) { return null; } 
}

function isFirstMentionAuthor(msg) {
  return msg.author.id === msg.mentions.members.first().user.id
}

function countMentions(msg) {
  return msg.mentions.members.size
}

function hasMention (msg) {
  return countMentions(msg) > 0
}

function getRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomColors() {
  let colors = [0x00ff80,0xc8b40a,0x2e2538,0x02e85f,0x1f4bdb];
  return color = getRandom(colors)
}

function changeExtension(url) {
  var url
  if (url.includes('a_')){
    url = url.substr(0, url.lastIndexOf('.')) || url;
    return x = url + '.gif?size=1024'
  } else {
    url = url.substr(0, url.lastIndexOf('.')) || url;
    return x = url + '.png?size=1024'
  }
}

function removeExtraFromId (data){
  /* KEKW
  let remove = data.replace("<","");
  let remove1 = remove.replace(">","");
  let remove2 = remove1.replace("@","");
  */ 
  return data.replace(/[^\w\s]/gi, '')
}

function getMessage(msg) {
  let arr = msg.content.trim().split(' ')
  arr.shift()
  return arr.join(' ')
}

function sendText(msg, text) {
  let reply = new message.BaseMessage(msg)
  reply.setTitle(text)
  msg.channel.send(reply)
}

function getContent(content) {
  if(content === undefined) return undefined
  if((typeof content) === 'string') return content
  if(content instanceof Function) return (async () => await content())()
  if(Array.isArray(content)) return getRandom(content)
}

function formatDate(data) {
  var d = data,
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day,month,year].join('/')
}
function msToTime(duration) {
  var seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

function makeGifWord(text) {
  let word = text.toLowerCase();
  let separated = word.split("");
  let arr = separated.map(i => ':gif'+i+":");

  for( var i = arr.length-1; i--;){if ( arr[i] === ':gif :') arr.splice(arr.indexOf(':gif :'),1)}
  let finalWord = arr.join(' ')
  return finalWord
}

exports.changeExtension = changeExtension
exports.msToTime = msToTime
exports.isEmpty = isEmpty
exports.getAuthor = getAuthor
exports.getFirstMention = getFirstMention
exports.getFirstMentionID = getFirstMentionID
exports.countMentions = countMentions
exports.hasMention = hasMention
exports.getRandom = getRandom
exports.getMessage = getMessage
exports.sendText = sendText
exports.isFirstMentionAuthor = isFirstMentionAuthor
exports.getContent = getContent
exports.formatDate = formatDate
exports.randomColors = randomColors
exports.removeExtraFromId = removeExtraFromId
exports.makeGifWord = makeGifWord