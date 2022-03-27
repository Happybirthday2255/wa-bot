const { bot } = require('../lib/index')
bot(
    {
        pattern: 'react ?(.*)',
        fromMe: true,
        desc: 'React to msg',
        type: 'misc',
    },
    async (message, match) => {
        match = match || message.reply_message.text
        if (!match) return await message.sendMessage('_Example : react ❣_')
        const reactionMessage = {
            react: {
                text: match,
                key: message.reply_message.key
            }
        }
        return await message.client.sendMessage(message.jid, reactionMessage)
    }
)
