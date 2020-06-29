import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://lancincatalog.me/graphql',
    // uri: '/graphql',
});

export default client;