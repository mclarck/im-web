import {useCallback, useEffect} from "react"
import {useParams, useRouteMatch} from "react-router-dom"
import useUrl from "../services/useUrl"
import {GET_CART_ITEMS} from "../model/cart";
import {useLazyQuery} from "@apollo/client";
import useLink from "../services/useLink";
import {GET_SETTING} from "../model/setting/queries";

const useTopBar = () => {
    const {company} = useParams<any>()
    const [fetch, {data, error}] = useLazyQuery(GET_CART_ITEMS)
    const [fetchSetting, {
        data: setting,
        error: errorSetting
    }] = useLazyQuery(GET_SETTING, {fetchPolicy: "network-only"});
    const loadSetting = useCallback(() => fetch({variables: {id: "/api/settings/1"}}), [fetchSetting])
    const {getUrl} = useUrl()
    const {goTo} = useLink()
    const {url} = useRouteMatch()
    const onError = (e: any) => console.log(e.message)
    useEffect(() => {
        fetch()
        loadSetting()
    }, [fetch, loadSetting, url])
    if (error) onError(error.message)
    if (errorSetting) onError(errorSetting.message)
    return {
        company,
        goTo,
        setting: setting?.setting,
        cartSize: data?.items?.length,
        hasOrder: data?.items?.length > 0,
        getUrl
    }
}
export default useTopBar