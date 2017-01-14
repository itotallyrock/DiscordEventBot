
const ChatFormat = {
  bold: (message) => {
    return `**${message}**`
  },
  italic: (message) => {
    return `*${message}*`
  },
  underline: (message) => {
    return `__${message}__`
  },
  strikeout: (message) => {
    return `~~${message}~~`
  },
  code: (message, language) => {
    language = language || ''
    if (message.indexOf('\n') > -1) return `\`\`\`${language}\n${message}\n\`\`\``
    return `\`${message}\``
  },
  mention: (user) => {
    return `<@${user.id}>`
  }
}

module.exports = ChatFormat
