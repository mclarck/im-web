import {InMemoryCache, makeVar} from '@apollo/client'

export const cart: any = makeVar<any>([])
export const auth: any = makeVar<any>({})


const cache = new InMemoryCache({
    addTypename: false,
    typePolicies: {
        Query: {
            fields: {
                items: {
                    read() {
                        return cart()
                    }
                },
                auth: {
                    read() {
                        return auth()
                    }
                }
            }
        }
    }
})

export default cache
