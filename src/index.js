const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');

const typeDefs = gql`
  type Query {
    getPerson(id: Int!): Person
  }

  type Planet {
    name: String, 
    rotation_period: String, 
    orbital_period: String, 
    diameter: String, 
    climate: String, 
    gravity: String, 
    terrain: String, 
    surface_water: String, 
    population: String,
  }

  type Person {
    name: String 
    height: String 
    mass: String 
    gender: String
    homeworld: Planet
  }`;

const resolvers = {
    Person: {
        homeworld: async parent => {
            const response = await fetch(parent.homeworld);
            return response.json();
        }
    },

    Query: {
      getPerson: async (_, {id}) => {
         const response = await fetch(`https://swapi.dev/api/people/${id}/`);
         return response.json();
      },
    }
  };
  
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});