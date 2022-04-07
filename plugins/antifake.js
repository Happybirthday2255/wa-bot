const { bot, genButtonMessage, antiList, enableAntiFake } = require('../lib/')

bot(
	{
		pattern: 'antifake ?(.*)',
		fromMe: true,
		desc: 'set antifake',
		type: 'misc',
		onlyGroup: true,
	},
	async (message, match) => {
		if (!match)
			return await message.sendMessage(
				genButtonMessage(
					[
						{ id: 'antifake list', text: 'LIST' },
						{ id: 'antifake on', text: 'ON' },
						{ id: 'antifake off', text: 'OFF' },
					],
					'Antifake'
				),
				{},
				'button'
			)
		if (match == 'list') {
			let list = ''
			let codes = await antiList(message.jid, 'fake')
			await message.sendMessage(codes.join(','))
			codes.forEach((code, i) => {
				list += `${i + 1}. ${code}\n`
			})
			return await message.sendMessage('```' + list + '```')
		}
		if (match == 'on' || match == 'off') {
			await enableAntiFake(message.jid, match)
			return await message.sendMessage(
				`_Antifake ${match == 'on' ? 'Activated' : 'Deactivated'}_`
			)
		}
		await enableAntiFake(message.jid, match)
		return await message.sendMessage('_Antifake Updated_')
	}
)
