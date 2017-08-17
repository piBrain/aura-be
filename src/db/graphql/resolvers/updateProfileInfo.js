import db from '../../sequelize/models/db_connection'

const executeUpdateProfileInfo = async ({ nonce, info }) => {
  try {
    let session = await db.Session.findOne(
      { where: { nonce } },
    )
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.' } }
    let user = await session.getUser()
    if(!user) { return { err: true, response: 'Whoops! Something went wrong.' } }
    user.set(info)
    await user.save()
    return { err: false, response: 'Success!' }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message }
  }
}

const updateProfileInfo = (_, args, context) => {
  console.log('updateProfileInfo')
  return executeUpdateProfileInfo(args)
}

export default updateProfileInfo
