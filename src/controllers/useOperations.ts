import {useLocale} from "im-hooks";
import translations from "../resources/translations";
import {useLazyQuery} from "@apollo/client";
import {useContext, useEffect} from "react";
import {GET_OPERATIONS} from "../model/operations/queries";
import _ from "lodash";
import {useParams, useRouteMatch} from "react-router-dom";
import {AnalyticIO} from "../services/io/IOProvider";
import {GET_SETTING} from "../model/setting/queries";

const useOperations = (props?: any) => {
    const {locale} = useParams<any>()
    const {t, lang} = useLocale(translations, locale)
    const [fetch, {loading, data, error}] = useLazyQuery(GET_OPERATIONS, {fetchPolicy: "network-only"})
    const [getSetting, {
        loading: loadingSetting,
        data: setting,
        error: errorSetting
    }] = useLazyQuery(GET_SETTING, {fetchPolicy: "network-only"})
    const {url} = useRouteMatch()
    const anal = useContext(AnalyticIO)

    const onMsg = (payload: any) => {
        fetch()
    }
    const clearAnal = () => {
        if (anal) {
            anal.off("message", onMsg)
        }
    }

    useEffect(() => {
        fetch()
        getSetting({variables: {id: "/api/settings/1"}})
        if (anal) anal.on("message", onMsg)
        return () => {
            clearAnal()
        }
    }, [fetch, getSetting, url])

    if (error) console.log(error.message)
    if (errorSetting) console.log(errorSetting.message)

    const filter = (sales: any) => {
        return _.filter(sales, (o) => {
            const sale = o.node
            if (props.status) {
                return sale.status === props.status
            }
            return true
        })
    }
    console.log(lang)
    return {t, loading: loading || loadingSetting, setting: setting?.setting, filter, sales: data?.operations?.edges}
}

export default useOperations