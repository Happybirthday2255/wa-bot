const { bot } = require('../lib/index')
const fm = true

bot(
	{ pattern: 'jid', fromMe: fm, desc: '', type: 'misc' },
	async (message, match) => {
		return await message.sendMessage(
			message.mention[0] || message.reply_message.jif || message.jid
		)
	}
)
