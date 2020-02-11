const tmi = require('tmi.js')
const config = require('./config.json')
const {
    changeHue
} = require('./colors')

const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: config.botname,
        password: config.oauth
    },
    channels: config.channels
})

client.connect()

const colors = [
    'Blue',
    'Coral',
    'DodgerBlue',
    'SpringGreen',
    'YellowGreen',
    'Green',
    'OrangeRed',
    'Red',
    'GoldenRod',
    'HotPink',
    'CadetBlue',
    'SeaGreen',
    'Chocolate',
    'BlueViolet',
    'Firebrick'
]

let disabled = false

client.on('message', async (channel, tags, message, self) => {
    if (tags.username === config.username) {
        if (!disabled) {
            if (config.prime) try {
                const hex = changeHue(tags.color, 30)
                await client.say(channel, `/color ${hex}`)
            } catch (e) {
                console.log(e)
            } else client.color(colors[Math.floor(Math.random() * colors.length)])
        }
        if (message.toLowerCase() === '?disable') disabled = true
        if (message.toLowerCase() === '?enable') disabled = false
    }
})