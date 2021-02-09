import _ from "lodash"
import {useEffect, useState} from "react"
import {useParams, useRouteMatch} from "react-router-dom"
import useCartModel, {GET_CART_ITEMS} from "../model/cart";
import {useLazyQuery} from "@apollo/client";
import {GET_FULL_STOCKS} from "../model/stock/queries";
import {useLocale} from "im-hooks";
import translations from "../resources/translations";

const useStocks = () => {
    const {locale} = useParams<any>()
    const {t, lang} = useLocale(translations, locale)
    const {company} = useParams<any>()
    const {url} = useRouteMatch()
    const [key, setKey] = useState<string>()
    const [selected, select] = useState<any>()
    const [form, setForm] = useState<boolean>(false)
    const cart = useCartModel()
    const [fetch, {loading, data, error}] = useLazyQuery(GET_FULL_STOCKS, {fetchPolicy: "network-only"})
    const [getCart] = useLazyQuery(GET_CART_ITEMS)
    const stocks = data?.stocks?.edges

    useEffect(() => {
        fetch()
        getCart()
    }, [fetch, getCart, url])

    const filter = () => _.filter(stocks, (o) => {
        if (key) {
            const regex = new RegExp(`^${key}`, "i")
            const stock = o.node
            return (regex.test(stock?.product?.specie) ||
                regex.test(stock?.product?.mark))
        }
        return true
    })
    const showForm = () => setForm(true)
    const closeForm = () => setForm(false)
    const onCreate = () => {
        fetch()
    }
    const onSelect = (data: any) => {
        select(data)
        showForm()
    }
    const onSearch = (search: string) => setKey(search)
    const addToCart = (order: any) => {
        cart.add(order)
        fetch()
    }
    if (error) console.log(error.message)
    return {
        t,
        onCreate,
        selected,
        onSelect,
        select,
        company,
        form,
        showForm,
        closeForm,
        stocks,
        loading,
        key,
        filter,
        onSearch,
        addToCart
    }
}

export default useStocks