import { merge  } from 'lodash'
import requestDatumResolvers from './requestdatum_resolver'
import signUpUser from './signUpUser'
import newsletterSignUp from './newsletterSignUp'
import verifyUserEmail from './verifyUserEmail'
import verifyNewsletterEmail from './verifyNewsletterEmail'
import prioritizeDomain from './prioritizeDomain'
import getSecurityQuestions from './getSecurityQuestions'
import forgotPassword from './forgotPassword'
import resetPassword from './resetPassword'
import returnProfileInfo from './returnProfileInfo'
import updateProfileInfo from './updateProfileInfo'

const queries = { Query: { getSecurityQuestions, returnProfileInfo } }
const mutations = {
  Mutation: {
    prioritizeDomain,
    signUpUser,
    verifyUserEmail,
    newsletterSignUp,
    verifyNewsletterEmail,
    forgotPassword,
    resetPassword,
    updateProfileInfo
  }
}

export default merge({}, requestDatumResolvers, queries, mutations)
