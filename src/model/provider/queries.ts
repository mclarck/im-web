import {gql} from '@apollo/client'

const GET_PROVIDERS = gql`
    query GetProviders {
        providers {
            totalCount
            edges {
                node {
                    id
                    created
                    status
                    name
                    alias
                }
            }
        }
    }`


export {GET_PROVIDERS}