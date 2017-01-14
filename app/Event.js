const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment-timezone')
const Table = require('cli-table')

let EventSchema = new Schema({
  name: {
    type: String,
    default: 'Unnamed Event',
    maxlength: 32,
    minlength: 3
  },
  startTime: {
    type: Date,
    default: Date.now() + (5 * 60 * 1000),
    validate: {
      validator: function (startTime) {
        return startTime >= Date.now()
      }
    }
  },
  endTime: {
    type: Date,
    required: false
  },
  continuous: {
    // If
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  creator: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
    unique: true
  },
  server: {
    type: String,
    default: ''
  }
})

EventSchema.methods.getChatTable = function (timezones) {
  if (timezones == null) timezones = ['America/Los_Angeles', 'America/New_York', 'Europe/London']
  let self = this
  console.log('self1', self)

  let header = timezones.map((zone) => {
    return moment().tz(zone).format('z')
  })
  let startTimes = []
  let endTimes = []

  timezones.forEach((timezone) => {
    startTimes.push(moment(self.startTime).tz(timezone))
    if (!self.continuous) {
      endTimes.push(moment(self.endTime).tz(timezone))
    }
  })
  header.splice(0, 0, 'Timezone')
  let table = new Table({head: header})

  let startTimesFormated = timezones.map((zone) => {
    console.log('this.startTime', self.startTime)
    console.log('Formated', moment(self.startTime).tz(zone).format('ddd MMM D, h:mm a'))
    return moment(self.startTime).tz(zone).format('ddd MMM D, h:mm a')
  })
  startTimesFormated.splice(0, 0, 'Start')
  table.push(startTimesFormated)

  console.log('this', this)
  if (this.continuous === false) {
    let endTimesFormated = endTimes.map((time) => {
      return time.format('ddd MMM D, h:mm a')
    })
    endTimesFormated.splice(0, 0, 'End')
    table.push(endTimesFormated)
  }
  console.log(table.toString())
  return table.toString()
}

EventSchema.statics.getUserEvents = (uid) => {
  return this.find({creator: uid.toString().trim()})
}

EventSchema.statics.getServerEvents = (sid) => {
  return this.find({server: sid.toString().trim()})
}

EventSchema.statics.getUserEventsFromServer = (uid, sid) => {
  return this.find({creator: uid.toString().trim(), server: sid.toString().trim()})
}

module.exports = mongoose.model('Event', EventSchema)
module.exports.schema = EventSchema
