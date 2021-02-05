import _ from "lodash"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import useCartModel, {GET_CART_ITEMS} from "../model/cart";
import {useLazyQuery} from "@apollo/client";
import {GET_STOCKS} from "../model/stock/queries";

const useStocks = () => {
    const {company} = useParams<any>()
    const [key, setKey] = useState<string>()
    const cart = useCartModel()
    const [fetch, {loading, data, error}] = useLazyQuery(GET_STOCKS)
    const [getCart] = useLazyQuery(GET_CART_ITEMS)
    const stocks = data?.stocks?.edges

    useEffect(() => {
        fetch()
        getCart()
    }, [fetch, getCart])

    const filter = () => _.filter(stocks, (o) => {
        if (key) {
            const regex = new RegExp(`^${key}`, "i")
            const stock = o.node
            return (regex.test(stock?.product?.specie) ||
                regex.test(stock?.product?.mark))
        }
        return true
    })

    const onSearch = (search: string) => setKey(search)
    const addToCart = (order: any) => {
        cart.add(order)
        fetch()
    }
    if (error) console.log(error.message)
    return {company, stocks, loading, key, filter, onSearch, addToCart}
}

export default useStocks