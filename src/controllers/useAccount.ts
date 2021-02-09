import {useCallback, useEffect} from "react"
import {useFile, useLocale} from "im-hooks";
import {useLazyQuery} from "@apollo/client";
import {GET_CLIENT} from "../model/client/queries";
import {Store} from "../services/database";
import _ from "lodash";
import useUrl from "../services/useUrl";
import usePath from "../services/usePath";
import {useParams} from "react-router-dom";
import translations from "../resources/translations";


const useAccount = () => {
    const {locale} = useParams<any>()
    const {t} = useLocale(translations, locale)
    const {company} = useParams<any>()
    const [getClient, {data: auth, loading: loadingClient, error: errorClient}]: any = useLazyQuery(GET_CLIENT);
    const file = useFile()
    const {getUrl} = useUrl()
    const {getPath} = usePath()
    const store = new Store(company)

    const logout = () => {
        store.removeItem("auth")
        loadClient()
    }

    const onLogged = () => {
        loadClient()
    }

    const shortAddress = (address: any) => address ? `${address?.apt}, ${address?.street} ${address?.number}` : null

    const loadClient = useCallback(() => {
        const item = store.getVal("auth")
        if (item) getClient({variables: {id: item?.id}})
    }, [getClient])

    useEffect(() => {
        loadClient()
    }, [loadClient, company])

    if (errorClient) console.log(errorClient.message)

    return {
        t,
        onLogged,
        getUrl,
        getPath,
        shortAddress,
        file,
        logout,
        auth: auth?.client,
        isAuth: !_.isEmpty(auth?.client),
        loading: loadingClient
    }
}
export default useAccount