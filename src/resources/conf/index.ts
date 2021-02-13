const conf = {
    gql: {
        url: "http://api.inmarketify.ml/api/graphql",
    },
    rest: {
        url: "http://api.inmarketify.ml",
    },
    io: {
        url: "ws://io.inmarketify.ml",
        options: { transports: ["websocket"] },
    },
};

export default conf;
