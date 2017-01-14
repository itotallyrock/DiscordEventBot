const parseDuration = require('parse-duration')
const moment = require('moment')
const ChatFormat = require('../chatformat')

const Remind = (message, args) => {
  let custom = args.slice()
  // Longest reminder is 31 days, smallest is 100
  let reminder = Math.max(Math.min(Math.abs(parseDuration(args[0])), 0), 31 * 24 * 60 * 60 * 1000)
  let text = (custom.splice(1, custom.length).join(' ') || '').trim().substring(0, 500)
  let warning = ''
  if (reminder > 3600000) {
    warning = ChatFormat.bold('Warning! Long reminders have a chance to not succeed.  For these create an event.  ')
  }
  message.author.sendMessage(`${warning}Reminding in ${moment.duration(reminder).humanize()}`)
  setTimeout(() => {
    if (text !== '') {
      text = `, ${ChatFormat.italic(text)}`
    } else {
      text = `.`
    }
    message.author.sendMessage(`Here's your reminder${text}`)
  }, reminder)
}

module.exports = Remind

module.exports.docs = '[Time string] (Message to help you remember)'
module.exports.desc = 'Send a message to you in a set amount of time.'
