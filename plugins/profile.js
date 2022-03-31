const { bot } = require('../lib/index')
const fm = true

bot(
	{ pattern: 'jid', fromMe: fm, desc: '', type: 'misc' },
	async (message, match) => {
		return await message.sendMessage(
			message.mention[0] || message.reply_message.jid || message.jid
		)
	}
)

bot(
	{ pattern: 'block', fromMe: fm, desc: '', type: 'misc' },
	async (message, match) => {
		const id =
			message.mention[0] ||
			message.reply_message.jid ||
			(!message.isGroup && message.jid)
		if (!id) return await message.sendMessage('*Give me a person*')
		await message.sendMessage('_Blocked_')
		await message.Block(id)
	}
)

bot(
	{ pattern: 'unblock', fromMe: fm, desc: '', type: 'misc' },
	async (message, match) => {
		const id =
			message.mention[0] ||
			message.reply_message.jid ||
			(!message.isGroup && message.jid)
		if (!id) return await message.sendMessage('*Give me a person*')
		await message.sendMessage('_Unblocked_')
		await message.Unblock(id)
	}
)
