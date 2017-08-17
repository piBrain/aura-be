import { mailClient, emailDefaults } from '../../../lib/mail_client'

const executeNewsletterSignUp = async ({ url, email, firstName, lastName, organization } = { organization: '' }) => {
  const unformattedDate = new Date()
  unformattedDate.setHours(unformattedDate.getHours()+1)
  const date = unformattedDate.toISOString()
  const verifyUrl = url + `?newsletter=true&email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&expiryTime=${encodeURIComponent(date)}&organization=${encodeURIComponent(organization)}`
  const mail = {
    from: 'content@pibrain.io',
    to: email,
    subject: 'Confirm piBrain Newsletter Signup',
    content: `Please click <a href=${verifyUrl}>here</a> to confirm your newsletter subscription. <br />If you did not sign-up for this please contact us at support@pibrain.io`,
    type: 'newsLetterSignupConfirmation',
  }
  const returnResponse = 'Success! Please check your e-mail to confirm your subscription to the piBrain newsletter, it will expire in 1 hour.'
  try {
    return await mailClient.sendMail(returnResponse, mail)
  } catch(err) {
    console.log(err.message, err.response.status, err.response.body, err.response.headers)
    return { err: true, response: err.message }
  }
}

const newsletterSignUp = (_, args, context) => {
  console.log('newsLetterSignUp')
  return executeNewsletterSignUp(args)
}

export default newsletterSignUp
