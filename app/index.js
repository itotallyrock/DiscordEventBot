const Discord = require('discord.js')
const mongoose = require('mongoose')
const Command = require('./Command')
const config = require('../config')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://' + config.get('database.user') + ':' + config.get('database.password') + '@' + config.get('database.host') + ':' + config.get('database.port') + '/' + config.get('database.db'))

const bot = new Discord.Client()

bot.on('ready', () => {
  if (config.get('application.user.nickname').trim() !== '') bot.user.setUsername(config.get('application.user.nickname').trim())
  if (config.get('application.user.status').trim() !== '') bot.user.setStatus('game', config.get('application.user.status').trim())
  console.info('Bot is ready and listening.')
})

bot.on('message', (message) => {
  Command({bot: bot.user}).handle(message)
})

bot.on('disconnect', () => {
  console.warn('Disconnected from discord.')
  // Reconnect after 5 seconds
  setTimeout(() => {
    bot.login(config.get('application.user.token'))
  }, 5000)
})

bot.login(config.get('application.user.token'))
