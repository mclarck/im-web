import {gql} from '@apollo/client'

const GET_STOCKS = gql`
    query GetStocks {
        stocks {
            totalCount
            edges {
                node {
                    id
                    created
                    status
                    quantityAv
                    price
                    oldPrice
                    tax
                    shipping
                    shippingAdditional
                    devise
                    fraction
                    file{
                        uri
                        path
                        name
                    }
                    product{
                        specie
                        mark
                        variety
                        container
                    }
                }
            }
        }
    }`

const GET_FULL_STOCKS = gql`
    query GetFullStocks {
        stocks {
            totalCount
            edges {
                node {
                    id
                    created
                    status
                    quantity
                    quantityAv
                    price
                    oldPrice
                    tax
                    shipping
                    shippingAdditional
                    devise
                    fraction
                    entry {
                        id
                        branch
                        receipt
                        sent
                        stocked
                        provider {
                            id
                            name
                            alias
                        }
                    }
                    file {
                        id
                        uri
                        path
                        name
                    }
                    product {
                        id
                        specie
                        mark
                        variety
                        container
                    }
                }
            }
        }
    }`


export {GET_STOCKS, GET_FULL_STOCKS}