const { sticker, webpToMp4, addExif, bot } = require('../lib/index')
const fm = true

bot(
  { pattern: 'sticker', fromMe: fm, desc: '', type: 'sticker' },
  async (message, match) => {
    if (
      !message.reply_message ||
      (!message.reply_message.video && !message.reply_message.image)
    )
      return await message.sendMessage('*Reply to image/video*')
    return await message.sendMessage(
      await sticker('str',
        await message.reply_message.downloadAndSaveMediaMessage('sticker'),
        message.reply_message.image
          ? 1
          : message.reply_message.seconds < 10
            ? 2
            : 3
      ),
      { isAnimated: !!message.reply_message.video },
      'sticker'
    )
  }
)

bot(
  { pattern: 'take ?(.*)', fromMe: true, desc: '', type: 'sticker' },
  async (message, match) => {
    if (!message.reply_message.sticker || !message.reply_message)
      return await message.sendMessage('*Reply to sticker*')
    return await message.sendMessage(
      await addExif(
        await message.reply_message.downloadMediaMessage('mp4'),
        match
      ),
      {},
      'sticker'
    )
  }
)

bot(
  { pattern: 'mp4', fromMe: fm, desc: '', type: 'sticker' },
  async (message, match) => {
    if (
      !message.reply_message.sticker ||
      !message.reply_message ||
      !message.reply_message.animated
    )
      return await message.sendMessage('*Reply to animated sticker*')
    return await message.sendFromUrl(
      await webpToMp4(
        await message.reply_message.downloadAndSaveMediaMessage('sticker')
      )
    )
  }
)
