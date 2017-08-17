import db from '../../sequelize/models/db_connection'

const executePromoteMemberToAdmin = async ({ nonce, targetUser, teamName }) => {
  try {
    const session =  await db.Session.findOne({ where: { nonce } })
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.', data: {} } }
    const user = await db.User.findOne({ where: { email: targetUser } })
    if(!user) { return { err: true, response: 'Whoops! Something went wrong.', data: {} } }
    const teams = await user.getTeams()
    const team = teams.filter((team) => (team.name == teamName))[0]
    if( !team.active ) { return { err: true, response: 'Team not active!' } }
    const userTeam = team.UserTeam
    if(!userTeam.active) { return { err: true, response: `${user.firstName} has not accepted their invite yet!` } }
    if(userTeam.get('type') == 'ADMIN' || userTeam.get('type') == 'OWNER') { return { err: true, response: `${user.firstName} is already an admin or owner!`} }
    userTeam.set('type', 'ADMIN')
    await userTeam.save()
    return { err: false, response: 'Success!' }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message, data: {} }
  }
}

const promoteMemberToAdmin = (_, args, context) => {
  console.log('promoteMemberToAdmin')
  return executePromoteMemberToAdmin(args)
}

export default promoteMemberToAdmin
