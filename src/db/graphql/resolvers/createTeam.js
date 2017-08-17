import db from '../../sequelize/models/db_connection'
import shortId from 'shortid'

const executeCreateTeam = async ({ nonce, name }) => {
  try {
    let session =  await db.Session.findOne({ where: { nonce } })
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.' } }
    let user = await session.getUser()
    if(!user) { return { err: true, response: 'Whoops! Something went wrong.' } }
    let team = await db.Team.create({ name })
    await team.addUser(user, { through: { type: 'OWNER', active: true, activationNonce: shortId.generate() } })
    return { err: false, response: `Success ${name} was created!` }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message }
  }
}

const createTeam = (_, args, context) => {
  console.log('createTeam')
  return executeCreateTeam(args)
}

export default createTeam
