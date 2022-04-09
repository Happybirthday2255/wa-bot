const {
	bot,
	genButtonMessage,
	mentionMessage,
	enableMention,
	clearFiles,
} = require('../lib/')

bot(
	{
		pattern: 'mention ?(.*)',
		fromMe: true,
		desc: 'To set and Manage mention',
	},
	async (message, match) => {
		if (!match)
			return await message.sendMessage(
				genButtonMessage(
					[
						{ id: 'mention on', text: 'ON' },
						{ id: 'mention off', text: 'OFF' },
						{ id: 'mention get', text: 'GET' },
					],
					'Mention Msg Manager'
				),
				{},
				'button'
			)
		if (match == 'get') {
			const msg = await mentionMessage()
			if (!msg)
				return await message.sendMessage('_Reply to Mention not Activated._')
			return await message.sendMessage(msg)
		} else if (match == 'on' || match == 'off') {
			await enableMention(match == 'on')
			return await message.sendMessage(
				`_Reply to mention ${match == 'on' ? 'Activated' : 'Deactivated'}_`
			)
		}
		await enableMention(match)
		clearFiles()
		return await message.sendMessage('_Mention Updated_')
	}
)
