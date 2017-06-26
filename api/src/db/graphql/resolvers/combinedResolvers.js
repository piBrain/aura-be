import { merge  } from 'lodash'
import requestDatumResolvers from './requestdatum_resolver'
import signUpUser from './signUpUser'
import newsletterSignUp from './newsletterSignUp'
import verifyUserEmail from './verifyUserEmail'
import verifyNewsletterEmail from './verifyNewsletterEmail'
import prioritizeDomain from './prioritizeDomain'
let queries = { Query: {  } }
let mutations = { Mutation: { prioritizeDomain, signUpUser, verifyUserEmail, newsletterSignUp, verifyNewsletterEmail } }
export default merge({}, requestDatumResolvers, queries, mutations)
