import db from '../../sequelize/models/db_connection'

const executeReturnProfileInfo = async ({ nonce }) => {
  try {
    let session = await db.Session.findOne(
      { where: { nonce } },
    )
    let user = await db.User.findOne(
      { where: { id: session.user_id } }
    )
    return { err: false, response: 'Success!', data: { ...user.get({ plain: true }) } }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message, data: {} }
  }
}

const returnProfileInfo = (_, args, context) => {
  console.log('returnProfileInfo')
  return executeReturnProfileInfo(args)
}

export default returnProfileInfo
