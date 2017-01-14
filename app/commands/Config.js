const ChatFormat = require('../chatformat')
const Permission = require('../permission')

const Config = (message, args) => {
  if (message.guild !== undefined && !Permission.hasRole(message.member, 'EventManager')) {
    return message.author.sendMessage(`You do not have sufficient permission to perform ${args[0]}`) || false
  }
  // TODO: Implement
  message.channel.sendMessage(`${ChatFormat.mention(message.author)} Hi`)
}

module.exports = Config

module.exports.docs = '[option] [value]'
module.exports.desc = 'Configure the bot for your server.'
