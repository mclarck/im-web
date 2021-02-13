const conf = {
    gql: {
        url: "http://api.inmarketify.ml:8000/api/graphql",
    },
    rest: {
        url: "http://api.inmarketify.ml:8000",
    },
    io: {
        url: "ws://api.inmarketify.ml:8080",
        options: { transports: ["websocket"] },
    },
};

export default conf;
