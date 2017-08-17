import db from '../../sequelize/models/db_connection'
import authHandler from './authHandler'
import shortId from 'shortid'
import { mailClient, emailDefaults } from '../../../lib/mail_client'

const executeSignUpUser = async (args) => {
  console.log('executeSignUpUser')
  let nonce = shortId.generate()
  let date = new Date()
  date.setHours(date.getHours()+1)
  try {
    let user, newRecord
    [user, newRecord] = await db.User.findOrCreate(
      {
        where: {
          $or: {
            activationNonce: nonce,
            email: args.email
          }
        },
        defaults: {
          ...args,
          active: false,
          activationNonce: nonce,
          activationExpiry: date,
        }
      },
    )
    if(user.active) {
      return { err: true, response: 'There is already an active user with that email.' }
    }
    if(!newRecord) {
      user.set('activationExpiry', date)
      user.set('activationNonce', nonce)
    }
    await user.save()
    const url = args.url + `?verify=${nonce}`
    const email = {
      email: args.email,
      subject: 'Verify Aura User Account',
      content: `Please click <a href=${url}>here</a> to verify your account and finish signing up. <br />Or copy and paste: ${args.url} into your address bar on your browser.<br/>If you did not sign-up for please contact us at aura+support@pibrain.io`,
      type: 'auraUserSignUpConfirmation',
    }
    const returnResponse = `An email has been sent to ${args.email}, please click the link to confirm your account. It will expire 1 hour from now.` 
    return await mailClient.sendMail(returnResponse, email)
  } catch(err) {
    console.log(err)
    return { err: true, response: err.message }
  }
}


const signUpUser = (_, args, context) => {
  console.log('signUpUser')
  return executeSignUpUser(args)
}


export default signUpUser
