const { tiktok, bot, getBuffer } = require('../lib/index')

bot(
	{
		pattern: 'tiktok ?(.*)',
		fromMe: true,
		desc: 'Download tiktok video',
		type: 'download',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match) return await message.sendMessage('_Example : tiktok url_')
		const result = await tiktok(match)
		if (!result)
			return await message.sendMessage('*Not found*', {
				quoted: message.quoted,
			})
		const { buffer, type } = await getBuffer(result.url2)
		if (!buffer) return await message.sendMessage(result.toString())
		return await message.sendMessage(buffer, { quoted: message.quoted }, type)
	}
)
