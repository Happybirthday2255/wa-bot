const { bot, getBuffer } = require('../lib/index')
bot(
  {
    pattern: 'upload ?(.*)',
    fromMe: true,
    desc: 'Download from url',
    type: 'download',
  },
  async (message, match) => {
    match = match || message.reply_message.text
    if (!match) return await message.sendMessage('_Example : upload url_')
    await message.sendFromUrl(match)
  }
)
