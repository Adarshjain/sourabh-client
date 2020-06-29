import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: '/graphql',
    // uri: 'http://192.168.1.100:9002/graphql',
});

export default client;