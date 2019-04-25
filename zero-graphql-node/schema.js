import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString

} from 'graphql';

import fetch from 'node-fetch';

const BASE_URL = 'https://restcountries.eu/rest/v2/';

const CountryType = new GraphQLObjectType({
  name: 'country',
  description: '...',

  fields: ({
    name: {
      type: GraphQLString,
      resolve: country => country.name
    }
  })

})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',

  fields: () => ({
    country: {
      type: CountryType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: (root, args) => fetch(`${BASE_URL}`)
        .then(res => res.json())
        .then(json => json.country)
    }
  })
})

export default new GraphQLSchema({
  quury: QueryType,
})





















































// import fetch from 'node-fetch';
// import {
//   GraphQLID,
//   GraphQLList,
//   GraphQLNonNull,
//   GraphQLObjectType,
//   GraphQLSchema,
//   GraphQLString,
// } from 'graphql';
// import {
//   fromGlobalId,
//   globalIdField,
//   nodeDefinitions,
// } from 'graphql-relay';

// const {
//   nodeField,
//   nodeInterface,
// } = nodeDefinitions(
//   // A method that maps from a global id to an object
//   (globalId, {loaders}) => {
//     const {id, type} = fromGlobalId(globalId);
//     if (type === 'Person') {
//       return loaders.person.load(id);
//     }
//   },
//   // A method that maps from an object to a type
//   (obj) => {
//     if (obj.hasOwnProperty('username')) {
//       return PersonType;
//     }
//   }
// );

// const PersonType = new GraphQLObjectType({
//   name: 'Person',
//   description: 'Somebody that you used to know',
//   fields: () => ({
//     id: globalIdField('Person'),
//     firstName: {
//       type: GraphQLString,
//       description: 'What you yell at me',
//       resolve: obj => obj.first_name,
//     },
//     lastName: {
//       type: GraphQLString,
//       description: 'What you yell at me when I\'ve been bad',
//       resolve: obj => obj.last_name,
//     },
//     fullName: {
//       type: GraphQLString,
//       description: 'A name sandwich',
//       resolve: obj => `${obj.first_name} ${obj.last_name}`,
//     },
//     email: {
//       type: GraphQLString,
//       description: 'Where to send junk mail',
//     },
//     username: {
//       type: GraphQLString,
//       description: 'Log in as this',
//     },
//     friends: {
//       type: new GraphQLList(PersonType),
//       description: 'People who lent you money',
//       resolve: (obj, args, {loaders}) =>
//         loaders.person.loadManyByURL(obj.friends),
//     },
//   }),
//   interfaces: [nodeInterface],
// });

// const QueryType = new GraphQLObjectType({
//   name: 'Query',
//   description: 'The root of all... queries',
//   fields: () => ({
//     allPeople: {
//       type: new GraphQLList(PersonType),
//       description: 'Everyone, everywhere',
//       resolve: (root, args, {loaders}) => loaders.person.loadAll(),
//     },
//     node: nodeField,
//     person: {
//       type: PersonType,
//       args: {
//         id: {type: new GraphQLNonNull(GraphQLID)},
//       },
//       resolve: (root, args, {loaders}) => loaders.person.load(args.id),
//     },
//   }),
// });

// export default new GraphQLSchema({
//   query: QueryType,
// });