const ChatFormat = require('./chatformat')
const config = require('../config')

const Command = (options) => {
  let handlers = {
    'help': (message) => {
      this.docs = 'Displays a list of possible commands.'
      let commands = handlers
      let mention = (message.guild == null
        ? ''
        : (ChatFormat.mention(message.member) + '\n'))
      let appName = (options.bot.username || 'EventBot')
      let docs = Object.keys(commands).map((command) => {
        return '`' + config.get('commands.prefix') + command + ' ' + (commands[command].docs || '') + '` - ' + (commands[command].desc || 'Unknown description.')
      })
      message.channel.sendMessage(mention + appName + ' Help\n' + docs.join('\n'))
    },
    'create': require('./commands/Create'),
    'remind': require('./commands/Remind'),
    'config': require('./commands/Config')
  }
  this.handle = (message) => {
    if (!message.content.trim().startsWith(config.get('commands.prefix'))) {
      return false
    }
    let command = message.content.trim().substring(message.content.trim().indexOf(config.get('commands.prefix')) + (config.get('commands.prefix')).length).split(' ')
    let handler = handlers[command[0]]
    let args = command
    args.splice(0, 1)

    if (handler == null) {
      return false
    }
    if (typeof handler === 'function') {
      return handler(message, args)
    } else {
      return handler
    }
  }
  return this
}

module.exports = Command
