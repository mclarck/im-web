import {useFile, useLocale} from "im-hooks";
import {useLazyQuery} from "@apollo/client";
import {GET_FULL_CLIENT} from "../model/client/queries";
import {useCallback, useContext, useEffect} from "react";
import {Store} from "../services/database";
import useUrl from "../services/useUrl";
import {useParams, useRouteMatch} from "react-router-dom";
import translations from "../resources/translations";
import moment from "moment";
import {AnalyticIO} from "../services/io/IOProvider";

const useOrders = () => {
    const {locale} = useParams<any>()
    const {t,lang} = useLocale(translations, locale)
    const {url} = useRouteMatch()
    const {company} = useParams<any>()
    const [getClient, {
        data: auth,
        loading: loadingClient,
        error: errorClient
    }]: any = useLazyQuery(GET_FULL_CLIENT, {fetchPolicy: "cache-and-network"});
    const file = useFile()
    const {getUrl} = useUrl()
    const store = new Store(company)
    const analIO = useContext(AnalyticIO)
    const operations = auth?.client?.operations?.edges
    const getDate = (date: string) => {
        return moment(date).locale(lang).calendar()
    }

    const loadClient = useCallback(() => {
        const item = store.getVal("auth")
        if (item) getClient({variables: {id: item?.id}})
    }, [getClient])

    const states = [
        {state: "active", label: t("Preparing")},
        {state: "shipping", label: t("On way")},
        {state: "arrived", label: t("Arrived")},
        {state: "canceled", label: t("Canceled")},
    ]

    useEffect(() => {
        loadClient()
        if (analIO) {
            analIO.on("message", loadClient)
        }
        return () => {
            if (analIO) {
                analIO.off("message", loadClient)
            }
        }
    }, [loadClient, url])

    if (errorClient) console.log(errorClient.message)
    return {t, lang, states, getDate, auth: auth?.client, operations, getClient, getUrl, file}
}

export default useOrders