export default () => [
    `type Query {
      getSecurityQuestions( email: String!, nonce: String! ): JSON
      returnProfileInfo( nonce: String! ): JSON
      getTeams( nonce: String! ): JSON
    }`
  ]
