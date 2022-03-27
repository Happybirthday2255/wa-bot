const client = require('./lib/client')
const { DATABASE } = require('./config')
const start = async () => {
  console.log('wa-bot')
  await DATABASE.sync()
  console.log('DB syncing')
  await client.connect()
}
start()
