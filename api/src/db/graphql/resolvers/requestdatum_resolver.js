import { merge  } from 'lodash'
import GraphQLJSON from 'graphql-type-json'
import { GraphQLDateTime } from 'graphql-iso-date'

import db from '../../sequelize/models/db_connection'

import authHandler from './authHandler'
import prioritizeDomain from './prioritizeDomain'


const createSiteRequestData = (_, args, context) => {
  const executeUpdate = ({
    siteId,
    requestData,
    userId
  }) => {
    Object.values(requestData).filter((requestDatum) => { return (requestDatum.request != "" && requestDatum.method != "" ) }).forEach((requestDatum) => {
      return createRequestDatum(requestDatum, userId, siteId).then((requestDatumRecord) => {
        let requestDatumId = requestDatumRecord.id
        db.SiteRequestData.create({site_id: siteId, request_datum_id: requestDatumId}, { returning: true })
        let newCommandExs = [requestDatum.commandEx1, requestDatum.commandEx2]
        let validCommands = newCommandExs.filter((val) => { return (val && true) || false })
        attachCommandExamplesToRequestDatum(validCommands, userId, requestDatumId)
      })
    })
  }
  authHandler(context, executeUpdate, args)
}

const createRequestDatum = (requestDatum, userId, siteId) => {
  return db.RequestDatum.create({
    updatedAt: (new Date()).toISOString(), request: requestDatum.request, data: requestDatum.data, form: requestDatum.form,
    method: requestDatum.method, tags: requestDatum.tags, notes: requestDatum.notes
  }, { returning: true })
}

const attachCommandExamplesToRequestDatum = (validCommands, userId, requestDatumId) => {
  validCommands.forEach((val) => {
    db.CommandExample.create({
      user_id: userId,
      text: val
    }, { returning: true }).then((example) => {
      db.RequestDatumCommandExample.create({ command_example_id: example.id, request_datum_id: requestDatumId })
    })
  })
}

const single_record_query = (_, { id }) => {
  return db.RequestDatum.findById(id)
}

const records_by_range_query = (_, { id, range }) => {
  return db.RequestDatum.findAll({ offset: id, limit: range })
}

const first_non_validated_record = (_, args, context) => {
  console.log('someone asked for a record')
  const executeQuery = () => {
    console.log('gonna look for a record')
    return db.Site
      .findOne({
        where: {
          priority_domain: true,
          validated: false,
        },
        order: [ db.Sequelize.fn( 'RANDOM' ) ]
      })
  }
  return authHandler(context, executeQuery)
}

const requestDatumMutations = {
  Mutation: {
    createSiteRequestData,
    prioritizeDomain,
  }
}

const requestDatumQueries = {
  Query: {
    singleRequestDataRecord: single_record_query,
    requestDatumRecordsByRange: records_by_range_query,
    firstNonValidatedRecord: first_non_validated_record,
  }
}

const requestDatum = {
  RequestDatum: {
    id: ({id}) => (id),
    foundAt: ({ found_at }) => (found_at),
  }
}

const siteRequestData = {
  SiteRequestData: {
    id: ({id}) => (id),
  }
}

const scalarResolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime
}

export default merge({}, requestDatumMutations, requestDatumQueries, requestDatum, scalarResolvers, siteRequestData)
