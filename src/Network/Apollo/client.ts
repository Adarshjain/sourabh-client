import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://lancincatalog.me/graphql',
    // uri: 'http://192.168.1.100:9002/graphql',
});

export default client;