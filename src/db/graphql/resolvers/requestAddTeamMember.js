import db from '../../sequelize/models/db_connection'
import { mailClient } from '../../../lib/mail_client'
import shortId from 'shortid'

const executeRequestAddTeamMember = async ({ nonce, url, targetUser, teamName }) => {
  try {
    const session =  await db.Session.findOne({ where: { nonce } })
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.' } }
    const user = await session.getUser()
    if(!user) { return { err: true, response: 'Whoops! Something went wrong.' } }
    const teams = await user.getTeams()
    const team = teams.filter((team) => (team.name == teamName))[0]
    if(team.active == false) { return { err: true, response: 'Team is not active!' } }
    const newTeamMember = await db.User.findOne({ where: {email: targetUser} })
    if(!newTeamMember) { return { err: true, response: 'Can\'t find a user with that email' } }
    const activationNonce = shortId.generate()
    team.addUser(newTeamMember, { through: { type: "MEMBER", activationNonce } })
    const confirmUrl = url + `?confirm=${nonce}`
    const returnResponse = `The request to add ${targetUser} to ${teamName} has been sent! Please tell them to check their email.`
    const email = {
      to: targetUser,
      from: 'aura@pibrain.io',
      subject: `Join ${teamName} on Aura!`,
      content: `${user.firstName} ${user.lastName} has invited you to join their team ${teamName} on Aura! Please click <a href=${confirmUrl}> here to join the team.`,
      type: 'auraTeamMemberRequest',
    }
    return await mailClient.sendMail(returnResponse, email)
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message }
  }
}

const requestAddTeamMember = (_, args, context) => {
  console.log('addTeamMember')
  return executeRequestAddTeamMember(args)
}

export default requestAddTeamMember
