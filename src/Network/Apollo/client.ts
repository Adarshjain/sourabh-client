import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://catalogapplication-env-1.eba-sx47xqds.ap-south-1.elasticbeanstalk.com/graphql',
    // uri: 'http://192.168.1.100:9002/graphql',
});

export default client;