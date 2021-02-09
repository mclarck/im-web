import _ from "lodash"
import {useCallback, useContext, useEffect, useState} from "react"
import {RestClient, Store} from "../services/database"
import {useCalculator, useFile, useLocale} from "im-hooks"
import {useLazyQuery} from "@apollo/client";
import useCartModel, {GET_CART_ITEMS} from "../model/cart";
import {GET_CLIENT} from "../model/client/queries";
import {useParams} from "react-router-dom";
import translations from "../resources/translations";
import {AnalyticIO} from "../services/io/IOProvider";

const useCart = () => {
    const {locale} = useParams<any>()
    const {t} = useLocale(translations, locale)
    const {company} = useParams<any>()
    const cart = useCartModel()
    const [getCart, {data, error}] = useLazyQuery(GET_CART_ITEMS);
    const [getClient, {data: auth, loading: loadingClient, error: errorClient}]: any = useLazyQuery(GET_CLIENT);
    const [dest] = useState<any>(() => ({username: company, email: company, phone: "analytic@" + company}))
    const file = useFile()
    const {subTotal, shipment, amount} = useCalculator(data?.items)
    const rest = useContext(RestClient)
    const [loadingOperation, setLoadingOperation] = useState(false)
    const [orderSent, setOrderStatus] = useState(false)
    const analIO = useContext(AnalyticIO)

    if (error) console.log(error.message)
    if (errorClient) console.log(errorClient.message)

    const onLogged = () => loadClient()

    const loadClient = useCallback(() => {
        const store = new Store(company)
        const item = store.getVal("auth")
        if (item) getClient({variables: {id: item?.id}})
    }, [getClient])

    const bills: any = [
        {name: t("Subtotal"), value: subTotal()},
        {name: t("Shipping"), value: shipment()},
        {name: t("Total"), value: amount(), istotal: true},
    ];

    const onOrderSent = (order: any) => {
        if (analIO) {
            analIO.emit("message", {sender: auth?.client, dest: dest, content: {title: "new order", ...order}})
        }
    }

    const shortAddress = (address: any) => address ? `${address?.apt}, ${address?.street} ${address?.number}` : null

    const send = async () => {
        if (!data?.items) return null;
        setLoadingOperation(true)
        try {
            const operation = {
                client: auth?.client,
                orders: data?.items,
                type: "cash",
                amount: parseFloat(amount()),
            }
            const res = await rest?.request("POST", "/api/operations", operation)
            const order = await res.json()
            setOrderStatus(res.ok)
            onOrderSent(order)
        } catch (e) {
            console.log(e.message)
        } finally {
            setLoadingOperation(false)
        }
    }

    useEffect(() => {
        getCart()
        loadClient()
    }, [getCart, loadClient])

    return {
        ...cart,
        onLogged,
        t,
        loading: loadingClient || loadingOperation,
        send,
        orderSent,
        auth: auth?.client,
        shortAddress,
        file,
        bills,
        cart: data?.items,
        hasOrder: !_.isEmpty(data?.items),
        isAuth: !_.isEmpty(auth?.client)
    }
}

export default useCart;