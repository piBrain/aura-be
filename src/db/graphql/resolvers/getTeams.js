import db from '../../sequelize/models/db_connection'

const executeGetTeams = async ({ nonce }) => {
  try {
    let session =  await db.Session.findOne({ where: { nonce } })
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.', data: {} } }
    let user = await session.getUser()
    if(!user) { return { err: true, response: 'Whoops! Something went wrong.', data: {} } }
    let teams = await user.getTeams()
    return { err: false, response: `Success!`, data: { teams } }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message, data: {} }
  }
}

const getTeams = (_, args, context) => {
  console.log('getTeams')
  return executeGetTeams(args)
}

export default getTeams
