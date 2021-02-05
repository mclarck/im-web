import {useFile, useLocale} from "im-hooks";
import {useLazyQuery} from "@apollo/client";
import {GET_FULL_CLIENT} from "../model/client/queries";
import {useCallback, useEffect, useRef, useState} from "react";
import {Store} from "../services/database";
import useUrl from "../services/useUrl";
import {useParams, useRouteMatch} from "react-router-dom";
import {Manager} from "socket.io-client";
import conf from "../resources/conf";

const useOrders = () => {
    const {t, lang} = useLocale()
    const {url} = useRouteMatch()
    const {company} = useParams<any>()
    const [getClient, {
        data: auth,
        loading: loadingClient,
        error: errorClient
    }]: any = useLazyQuery(GET_FULL_CLIENT, {fetchPolicy: "network-only"});
    const [message, setMsg] = useState<any>()
    const file = useFile()
    const {getUrl} = useUrl()
    const store = new Store(company)
    const operations = auth?.client?.operations?.edges

    const loadClient = useCallback(() => {
        const item = store.getVal("auth")
        if (item) getClient({variables: {id: item?.id}})
    }, [getClient])

    useEffect(() => {
        loadClient()
        const manager = new Manager(conf.io.url, conf.io.options)
        const socket = manager.socket("/analytic")
        socket.emit("join", {room: company})
        socket.emit("register", {content: {...auth?.client}})
        socket.on("message", (msg: any) => setMsg(msg))
        return () => {
            if (socket) socket?.disconnect()
            console.log("socket disconnected")
        }
    }, [loadClient, url, message])

    if (errorClient) console.log(errorClient.message)
    return {t, lang, auth: auth?.client, operations, getClient, getUrl, file, loading: loadingClient}
}

export default useOrders