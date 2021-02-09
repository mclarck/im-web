const conf = {
    gql: {
        url: "http://api.inmarketify.lo:8000/api/graphql",
    },
    rest: {
        url: "http://api.inmarketify.lo:8000",
    },
    io: {
        url: "ws://inmarketify.lo:8080",
        options: { transports: ["websocket"] },
    },
};

export default conf;
