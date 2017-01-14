const convict = require('convict')

let config = convict({
  commands: {
    prefix: {
      doc: 'The required string before sub commands.  For example \'!\' will require all commands to start with a \'!\'.',
      format: String,
      default: '$',
      env: 'DISCORD_EVENTBOT_COMMAND_PREFIX'
    }
  },
  application: {
    name: {
      doc: 'The name of the discord bot application.',
      format: String,
      default: 'discord-event-bot',
      env: 'DISCORD_EVENTBOT_APPNAME'
    },
    clientid: {
      doc: 'The bot authenticaton clientid.',
      env: 'DISCORD_EVENTBOT_CLIENT_ID',
      format: String,
      default: null
    },
    secret: {
      doc: 'The bot authenticaton secret.',
      env: 'DISCORD_EVENTBOT_CLIENT_SECRET',
      format: String,
      default: null
    },
    user: {
      nickname: {
        doc: 'Bot\'s override nickname.',
        env: 'DISCORD_EVENTBOT_NICKNAME',
        format: String,
        default: 'Event BOT'
      },
      status: {
        doc: 'Bot\'s status message, this appears below their name.',
        default: 'Type `$event help`',
        env: 'DISCORD_EVENTBOT_STATUSMSG',
        format: String
      },
      username: {
        doc: 'Bot\'s username (name#4digitid)',
        env: 'DISCORD_EVENTBOT_USERNAME',
        format: (value) => {
          if (!value.match(/(^(.*))(#\d{4}$)/)) {
            throw new Error('Username is should be formmatted like my-username#1234')
          }
        },
        default: null
      },
      token: {
        doc: 'The bot\'s verification token.',
        env: 'DISCORD_EVENTBOT_TOKEN',
        format: String,
        default: null
      }
    }
  },
  database: {
    user: {
      docs: 'MongoDB user to authenticate with.',
      env: 'MONGODB_USER',
      format: String,
      default: null
    },
    password: {
      docs: 'MongoDB password to authenticate with.',
      env: 'MONGODB_PASS',
      format: String,
      default: null
    },
    host: {
      docs: 'MongoDB host location.',
      env: 'MONGODB_HOST',
      format: String,
      default: '127.0.0.1'
    },
    port: {
      docs: 'MongoDB port.',
      env: 'MONGODB_PORT',
      format: 'port',
      default: 27017
    },
    db: {
      docs: 'MongoDB database to use.',
      env: 'MONGODB_DB',
      format: String,
      default: 'discord'
    }
  }
})

config.validate({strict: true})

module.exports = config
