const { pinterest, bot, getBuffer } = require('../lib/index')

bot(
  {
    pattern: 'pinterest ?(.*)',
    fromMe: true,
    desc: 'Download pinterest video/image',
    type: 'download',
  },
  async (message, match) => {
    match = match || message.reply_message.text
    if (!match) return await message.sendMessage('_Example : pinterest url_')
    const result = await pinterest(match)
    if (!result)
      return await message.sendMessage('*Not found*', {
        quoted: message.quoted,
      })
    const { buffer, type } = await getBuffer(result)
    return await message.sendMessage(buffer, { quoted: message.quoted }, type)
  }
)
