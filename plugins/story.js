const { story, bot, getBuffer } = require('../lib/index')

bot(
  {
    pattern: 'story ?(.*)',
    fromMe: true,
    desc: 'Download Instagram stories',
    type: 'download',
  },
  async (message, match) => {
    match = match || message.reply_message.text
    if (!match) return await message.sendMessage('_Example : story username_')
    const result = await story(match)
    if (!result.length)
      return await message.sendMessage('*Not found*', {
        quoted: message.quoted,
      })
    for (const url of result) {
      const { buffer, type } = await getBuffer(url)
      await message.sendMessage(buffer, { quoted: message.quoted }, type)
    }
  }
)
