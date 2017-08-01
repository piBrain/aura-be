export default () => [
  `type Mutation {
    newsletterSignUp( url: String!, email: String!, firstName: String!, lastName: String! ): JSON
    signUpUser(
      firstName: String!,
      lastName: String!,
      email: String!,
      countryCode: String!,
      url: String!,
      title: String,
      company: String,
      phoneNumber: String!
    ): JSON
    verifyUserEmail( nonce: String!, url: String! ): JSON
    verifyNewsletterEmail( url: String!, email: String!, firstName: String!, lastName: String, timestamp: DateTime! ): JSON
    forgotPassword(nonce: String!, secQuestionResponse1: String!, secQuestionResponse2: String!): JSON
    resetPassword(nonce: String!, resetToken: String!, newPassword: String!): JSON
    updateProfileInfo(nonce: String!, info: JSON!): JSON
  }`,
]
