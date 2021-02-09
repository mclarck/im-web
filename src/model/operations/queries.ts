import {gql} from "@apollo/client";

const GET_OPERATIONS = gql`
    query GetOperations {
        operations {
            totalCount
            edges {
                node {
                    id
                    _id
                    created
                    status
                    amount
                    tax
                    shipment
                    subTotal
                    type
                    client {
                        id
                        _id
                        username
                        email
                        phone
                        address {
                            id
                            _id
                            street
                            apt
                            city
                            number
                            location {
                                id
                                x
                                y
                                label
                            }
                        }
                    }
                    orders {
                        edges {
                            node {
                                id
                                _id
                                quantity
                                stock {
                                    id
                                    _id
                                    quantity
                                    quantityAv
                                    price
                                    oldPrice
                                    tax
                                    shipping
                                    shippingAdditional
                                    devise
                                    fraction
                                    file {
                                        id
                                        _id
                                        uri
                                        path
                                        name
                                    }
                                    product {
                                        id
                                        _id
                                        specie
                                        mark
                                        variety
                                        container
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }`


export {GET_OPERATIONS}