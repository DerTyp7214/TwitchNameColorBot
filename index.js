const tmi = require('tmi.js')
const config = require('./config.json')

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

client.on('message', async (channel, tags, message, self) => {
    if (tags.username === config.username) client.color(colors[Math.floor(Math.random() * colors.length)])
})