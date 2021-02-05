import React from "react";
import {ApolloClient, ApolloProvider} from "@apollo/client";

export const Apollo = React.createContext<ApolloClient<any>|null>(null);

const GqlProvider = (props: { children?: any; apollo: ApolloClient<any>; }) => {
    return (
        <Apollo.Provider value={props.apollo}>
            <ApolloProvider client={props.apollo}>
                {props.children}
            </ApolloProvider>
        </Apollo.Provider>
    );
};

export default GqlProvider;
