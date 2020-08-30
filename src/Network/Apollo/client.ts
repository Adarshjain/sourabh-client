import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://suniljewellerscatalog-env.eba-qzd8ixja.ap-south-1.elasticbeanstalk.com/graphql',
    // uri: '/graphql',
});

export default client;