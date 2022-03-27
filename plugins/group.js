const { isAdmin, sleep, bot } = require('../lib/index')
const fm = true

bot(
  {
    pattern: 'kick ?(.*)',
    fromMe: fm,
    desc: 'Remove members from Group.',
    type: 'group',
    onlyGroup: true,
  },
  async (message, match) => {
    const participants = await message.groupMetadata(message.jid)
    const isImAdmin = await isAdmin(participants, message.client.user.jid)
    if (!isImAdmin) return await message.sendMessage(`_I'm not admin._`)
    const user = message.mention[0] || message.reply_message.jid
    if (!user) return await message.sendMessage(`_Give me a user_`)
    const isUserAdmin = await isAdmin(participants, user)
    if (isUserAdmin) return await message.sendMessage(`_User is admin._`)
    return await message.Kick(user)
  }
)
/*
bot(
  { pattern: "add ?(.*)", fromMe: true, desc: Lang.ADD, type: 'group', onlyGroup: true },
  async (message, match) => {
    let participants = await message.groupMetadata(message.jid)
    let isImAdmin = await isAdmin(participants, message.client.user.jid)
    if (!isImAdmin) return await message.sendMessage(`_I'm not admin._`)
    if (!match) return await message.sendMessage(Lang.GIVEME);
    match = match.split(" ").map((num) => numTojid(num));
    await message.Add(match)
  }
);
*/
bot(
  {
    pattern: 'promote ?(.*)',
    fromMe: fm,
    desc: 'Give admin role.',
    type: 'group',
    onlyGroup: true,
  },
  async (message, match) => {
    const participants = await message.groupMetadata(message.jid)
    const isImAdmin = await isAdmin(participants, message.client.user.jid)
    if (!isImAdmin) return await message.sendMessage(`_I'm not admin._`)
    const user = message.mention[0] || message.reply_message.jid
    if (!user) return await message.sendMessage(`_Give me a user._`)
    const isUserAdmin = await isAdmin(participants, user)
    if (isUserAdmin)
      return await message.sendMessage(`_User is already admin._`)
    return await message.Promote(user)
  }
)

bot(
  {
    pattern: 'demote ?(.*)',
    fromMe: fm,
    desc: 'Remove admin role.',
    type: 'group',
    onlyGroup: true,
  },
  async (message, match) => {
    const participants = await message.groupMetadata(message.jid)
    const isImAdmin = await isAdmin(participants, message.client.user.jid)
    if (!isImAdmin) return await message.sendMessage(`_I'm not admin._`)
    const user = message.mention[0] || message.reply_message.jid
    if (!user) return await message.sendMessage(`_Give me a user._`)
    const isUserAdmin = await isAdmin(participants, user)
    if (!isUserAdmin)
      return await message.sendMessage(`_User is not an admin._`)
    return await message.Demote(user)
  }
)

bot(
  {
    pattern: 'invite ?(.*)',
    fromMe: fm,
    desc: 'Get Group invite',
    type: 'group',
    onlyGroup: true,
  },
  async (message, match) => {
    const participants = await message.groupMetadata(message.jid)
    const isImAdmin = await isAdmin(participants, message.client.user.jid)
    if (!isImAdmin) return await message.sendMessage(`_I'm not admin._`)
    return await message.sendMessage(await message.inviteCode(message.jid))
  }
)

bot(
  {
    pattern: 'mute ?(.*)',
    fromMe: fm,
    desc: 'Makes Groups Admins Only.',
    type: 'group',
    onlyGroup: true,
  },
  async (message, match) => {
    const participants = await message.groupMetadata(message.jid)
    const isImAdmin = await isAdmin(participants, message.client.user.jid)
    if (!isImAdmin) return await message.sendMessage(`_I'm not admin._`)
    if (!match || isNaN(match))
      return await message.GroupSettingsChange(message.jid, true)
    await message.GroupSettingsChange(message.jid, true)
    await message.sendMessage(`_Muted for ${match} min._`)
    await sleep(60 * match)
    return await message.GroupSettingsChange(message.jid, false)
  }
)

bot(
  {
    pattern: 'unmute ?(.*)',
    fromMe: fm,
    desc: 'Makes Group All participants can send Message.',
    type: 'group',
    onlyGroup: true,
  },
  async (message, match) => {
    const participants = await message.groupMetadata(message.jid)
    const isImAdmin = await isAdmin(participants, message.client.user.jid)
    if (!isImAdmin) return await message.sendMessage(`_I'm not admin._`)
    return await message.GroupSettingsChange(message.jid, false)
  }
)

bot(
  {
    pattern: 'join ?(.*)',
    fromMe: fm,
    type: 'group',
    desc: 'Join invite link.',
  },
  async (message, match) => {
    match = match || message.reply_message.text
    if (!match)
      return await message.sendMessage(`_Give me a Group invite link._`)
    const wa = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/
    const [_, code] = match.match(wa) || []
    if (!code)
      return await message.sendMessage(`_Give me a Group invite link._`)
    await message.acceptInvite(code)
    return await message.sendMessage(`_Joined_`)
  }
)

bot(
  {
    pattern: 'revoke',
    fromMe: fm,
    onlyGroup: true,
    type: 'group',
    desc: 'Revoke Group invite link.',
  },
  async (message, match) => {
    const participants = await message.groupMetadata(message.jid)
    const im = await isAdmin(participants, message.client.user.jid)
    if (!im) return await message.sendMessage(`_I'm not admin._`)
    await message.revokeInvite(message.jid)
  }
)
