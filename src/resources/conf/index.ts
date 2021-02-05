const conf = {
    gql: {
        url: "http://192.168.0.227:8000/api/graphql",
    },
    rest: {
        url: "http://192.168.0.227:8000",
    },
    io: {
        url: "ws://192.168.0.227:5000",
        options: { transports: ["websocket"] },
    },
};

export default conf;
