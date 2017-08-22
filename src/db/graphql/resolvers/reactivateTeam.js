import db from '../../sequelize/models/db_connection'

const executeReactivateTeam = async ({ nonce, name }) => {
  try {
    let session =  await db.Session.findOne({ where: { nonce } })
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.' } }
    let user = await session.getUser()
    if(!user) { return { err: true, response: 'Whoops! Something went wrong.' } }
    const teams = await user.getTeams()
    const team = teams.filter((team) => (team.name == name))[0]
    if(team.active) { return { err: true, response: 'Team already reactivated!' } }
    const userTeam = team.UserTeam
    if(userTeam.get('type') != 'OWNER') { return { err: true, response: `Must be the owner of the team!`} }
    team.set('active', true)
    await team.save()
    return { err: false, response: `Success ${name} was reactivated!` }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message }
  }
}

const reactivateTeam = (_, args, context) => {
  console.log('deactivateTeam')
  return executeReactivateTeam(args)
}

export default reactivateTeam

