// const fs = require('fs');
const Event = require('../event')
const ChatFormat = require('../chatformat')
const Permission = require('../permission')
const moment = require('moment-timezone')

const Create = (message, args) => {
  if (message.guild != null && !Permission.hasRole(message.member, 'EventCreator')) {
    return false
  }
  let startTime = moment(args[1].toString().toLowerCase().trim() === 'now' ? Date.now() + 60 * 1000 * 5 : args[1].toString().trim())

  let options = {
    title: args[0].toString().trim(),
    creator: message.author.id,
    message: message.id
  }

  if (message.guild) {
    options.server = message.guild.id
  } else {
    options.server = ''
  }

  if (startTime.isValid()) {
    options.startTime = startTime.toDate()
  } else {
    return false
  }

  if (args[2] == null) {
    options.continuous = true
  } else {
    options.endTime = startTime.add(Number(args[2].toString().trim()), 'hours').toDate()
    options.continuous = false
  }
  console.log('options222232131', options)
  let event = new Event(options)
  event.save().then(() => {
    console.log(event.startTime, event.endTime)
    if (message.guild != null) {
      message.channel.sendMessage(`${ChatFormat.mention(message.author)}\n${ChatFormat.code(event.getChatTable(), 'java')}`)
    } else { message.author.sendMessage(`${ChatFormat.code(event.getChatTable(), 'java')}`) }
  }).catch((err) => {
    console.error('Error Saving Event', err)
    if (message.guild != null) {
      message.channel.sendMessage(`${ChatFormat.mention(message.author)}\nFailed to create event.`)
    } else {
      message.author.sendMessage('Failed to create event.')
    }
  })
}

module.exports = Create

module.exports.docs = '[Event Name] [Start Date & Time | Now] (Duration Hours)'
module.exports.desc = 'Used to create an event.'
