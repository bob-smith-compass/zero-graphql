import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from 'graphql';
import fetch from 'node-fetch';

// const BASE_URL = 'https://restcountries.eu/rest/v2/all';
// const BASE_URL = 'https://restcountries.eu/rest/v2/canada';
const BASE_URL = 'https://restcountries.eu/rest/v2';

function getCountryByName(country) {
    // return  fetch(`${BASE_URL}/${args.id}`)
    return  fetch(`${BASE_URL}/${country}`)
        .then(res => res.json())
        .then(json => json.alpha3Code)
};
const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: '...',

    /**
     * name":"Afghanistan","topLevelDomain":[".af"],"alpha2Code":"AF","alpha3Code":"AFG","callingCodes":["93"],"capital":"Kabul",
     * borders: ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"]
     */
    fields: () => ({
        firstName: {
            type: GraphQLString,
            resolve: (person) => person.first_name
        },
        name: {type: GraphQLString},
        topLevelDomain: {type: GraphQLString},
        alpha2Code: {type: GraphQLString},
        callingCodes: {type: GraphQLString},
        capital: {type: GraphQLString},
        borders: {
            type: new GraphQLList([String]),
            resolve: (root, alpha3Code) => 
                getCountryByName('canada')
        }

    })
});
const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
        person: PersonType,
        args: {
            id: {type: GraphQLString}
        },
        resolve: () => // Promise <PersonType>
            fetch(`${BASE_URL}/${args.id}`)
    })
})

export default new GraphQLSchema({
    query: Query
})