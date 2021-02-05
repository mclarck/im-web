import {useEffect} from "react"
import {useParams, useRouteMatch} from "react-router-dom"
import useUrl from "../services/useUrl"
import {GET_CART_ITEMS} from "../model/cart";
import {useLazyQuery} from "@apollo/client";
import useLink from "../services/useLink";

const useTopBar = () => {
    const {company} = useParams<any>()
    const [fetch, {data, error}] = useLazyQuery(GET_CART_ITEMS)
    const {getUrl} = useUrl()
    const {goTo} = useLink()
    const {url} = useRouteMatch()

    useEffect(() => {
        fetch()
    }, [fetch, url])
    if (error) console.log(error.message)
    return {company, goTo, cartSize: data?.items?.length, hasOrder: data?.items?.length > 0, getUrl}
}
export default useTopBar