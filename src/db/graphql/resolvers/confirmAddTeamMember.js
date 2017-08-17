import db from '../../sequelize/models/db_connection'
import mailClient from '../../../lib/mail_client'

const executeConfirmAddTeamMember = async ({ nonce }) => {
  try {
    const userteam = await db.UserTeam.findOne({ where: { activationNonce: nonce } })
    if(!userteam) { return { err: true, response: 'Whoops! Something went wrong.' } }
    const session =  await db.Session.findOne({ where: { userId: userteam.userId } })
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.' } }
    userteam.set('active', true)
    await userteam.save()
    const team = await userteam.getTeam()
    return { err: false, response: `Successfully joined ${team.name}` }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message }
  }
}

const confirmAddTeamMember = (_, args, context) => {
  console.log('addTeamMember')
  return executeConfirmAddTeamMember(args)
}

export default confirmAddTeamMember
