const bot = require('../lib/events')
const ctt = (x) => x.toString().match(/(\W*)([A-Za-z0-9ğüşiö ç]*)/)[2]
bot.addCommand(
  { pattern: 'menu ?(.*)', fromMe: true, desc: '', dontAddCommandList: true },
  async (message, match) => {
    const menu = bot.commands.map((e) => ctt(e.pattern))
    await message.sendMessage('```' + menu.join('\n') + '```')
  }
)
