import { merge  } from 'lodash'
import signUpUser from './signUpUser'
import newsletterSignUp from './newsletterSignUp'
import verifyUserEmail from './verifyUserEmail'
import verifyNewsletterEmail from './verifyNewsletterEmail'
import getSecurityQuestions from './getSecurityQuestions'
import forgotPassword from './forgotPassword'
import resetPassword from './resetPassword'
import returnProfileInfo from './returnProfileInfo'
import updateProfileInfo from './updateProfileInfo'
import createTeam from './createTeam'
import getTeams from './getTeams'
import GraphQLJSON from 'graphql-type-json'
import { GraphQLDateTime } from 'graphql-iso-date'

const queries = { Query: { getSecurityQuestions, returnProfileInfo, getTeams } }
const mutations = {
  Mutation: {
    signUpUser,
    verifyUserEmail,
    newsletterSignUp,
    verifyNewsletterEmail,
    forgotPassword,
    resetPassword,
    updateProfileInfo,
    createTeam
  }
}
const scalarResolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime
}
export default merge({}, queries, mutations, scalarResolvers)
