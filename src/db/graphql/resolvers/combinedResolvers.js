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
import promoteMemberToAdmin from './promoteMemberToAdmin'
import requestAddTeamMember from './requestAddTeamMember'
import confirmAddTeamMember from './confirmAddTeamMember'
import deactivateTeam from './deactivateTeam'
import reactivateTeam from './reactivateTeam'
import GraphQLJSON from 'graphql-type-json'
import { GraphQLDateTime } from 'graphql-iso-date'

const queries = { Query: { getSecurityQuestions, returnProfileInfo, getTeams } }
const mutations = {
  Mutation: {
    confirmAddTeamMember,
    createTeam,
    deactivateTeam,
    forgotPassword,
    newsletterSignUp,
    reactivateTeam,
    requestAddTeamMember,
    resetPassword,
    signUpUser,
    updateProfileInfo,
    verifyNewsletterEmail,
    verifyUserEmail,
    promoteMemberToAdmin,
  }
}
const scalarResolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime
}
export default merge({}, queries, mutations, scalarResolvers)
