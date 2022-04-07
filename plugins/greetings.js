const {
	enableGreetings,
	setMessage,
	deleteMessage,
	bot,
	getMessage,
	genButtonMessage,
	greetingsPreview,
	clearGreetings,
} = require('../lib/')

bot(
	{
		pattern: 'welcome ?(.*)',
		fromMe: true,
		desc: 'Welcome new members',
		onlyGroup: true,
	},
	async (message, match) => {
		const welcome = await getMessage(message.jid, 'welcome')
		if (!match && !welcome)
			return await message.sendMessage('*Example : welcome Hi #mention*')
		if (!match) {
			await message.sendMessage(welcome.message)
			return await message.sendMessage(
				genButtonMessage(
					[
						{ id: 'welcome on', text: 'ON' },
						{ id: 'welcome off', text: 'OFF' },
					],
					'Welcome'
				),
				{},
				'button'
			)
		}
		if (match == 'on' || match == 'off') {
			if (!welcome)
				return await message.sendMessage('*Example : welcome Hi #mention*')
			await enableGreetings(message.jid, 'welcome', match)
			return await message.sendMessage(
				`_Welcome  ${match == 'on' ? 'Enabled' : 'Disabled'}_`
			)
		}
		if (match === 'delete') {
			await message.sendMessage('_Welcome deleted_')
			clearGreetings(message.jid, 'welcome')
			return await deleteMessage(message.jid, 'welcome')
		}
		await setMessage(message.jid, 'welcome', match)
		const { msg, options, type } = await greetingsPreview(message, 'welcome')
		await message.sendMessage(msg, options, type)
		return await message.sendMessage('_Welcome set_')
	}
)

bot(
	{
		pattern: 'goodbye ?(.*)',
		fromMe: true,
		desc: 'Goodbye members',
		onlyGroup: true,
	},
	async (message, match) => {
		const welcome = await getMessage(message.jid, 'goodbye')
		if (!match && !welcome)
			return await message.sendMessage('*Example : goodbye Bye #mention*')
		if (!match) {
			await message.sendMessage(welcome.message)
			return await message.sendMessage(
				genButtonMessage(
					[
						{ id: 'goodbye on', text: 'ON' },
						{ id: 'goodbye off', text: 'OFF' },
					],
					'Goodbye'
				),
				{},
				'button'
			)
		}
		if (match == 'on' || match == 'off') {
			if (!welcome)
				return await message.sendMessage('*Example : goodbye Bye #mention*')
			await enableGreetings(message.jid, 'goodbye', match)
			return await message.sendMessage(
				`_Goodbye ${match == 'on' ? 'Enabled' : 'Disabled'}_`
			)
		}
		if (match === 'delete') {
			await message.sendMessage('_Goodbye deleted_')
			clearGreetings(message.jid, 'goodbye')
			return await deleteMessage(message.jid, 'goodbye')
		}
		await setMessage(message.jid, 'goodbye', match)
		const { msg, options, type } = await greetingsPreview(message, 'goodbye')
		await message.sendMessage(msg, options, type)
		return await message.sendMessage('_Goodbye set_')
	}
)
