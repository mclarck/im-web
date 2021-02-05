import {useLocale} from "im-hooks";
import {useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {Manager} from "socket.io-client"
import conf from "../resources/conf";
import {useLazyQuery} from "@apollo/client";
import {GET_CLIENT} from "../model/client/queries";
import {RestClient, Store} from "../services/database";
import moment from "moment";
import _ from "lodash";
import useNotification from "../services/useNotify";


const useChat = () => {
    const {t} = useLocale()
    const {company} = useParams<any>()
    const [getClient, {data: auth, loading: loadingClient, error: errorClient}]: any = useLazyQuery(GET_CLIENT);
    const support = `${company}@${t("support")}`
    const io = useRef<SocketIOClient.Socket>()
    const rest = useContext(RestClient)
    const [msg, setMsg] = useState<any>()
    const {notify} = useNotification()
    const store = new Store(company)

    const mapMsg = _.map(msg, (m) => {
        if (!auth?.client) return []
        const isSender = m?.sender?.phone === auth?.client?.phone
        const created = moment(m?.created).calendar()
        return {...m, isSender, created}
    })

    const clearMsg = () => {
        store.setVal("chat", [])
        fetchMsg()
    }

    const fetchMsg = () => {
        const chatMsg = store.getVal("chat");
        setMsg(chatMsg);
    }

    const send = (msg: any) => {
        const payload = {
            sender: auth?.client,
            dest: {username: company, phone: company},
            room: company,
            created: moment().format(),
            content: msg
        }
        io.current?.emit("message", payload)
    }

    const sendToServer = async (msg: any) => {
        try {
            return await rest?.request("POST", "/api/chats", msg)
        } catch (e) {
            console.log(e.message)
            return e
        }
    }

    const loadIo = useCallback(() => {
        if (auth?.client) {
            const manager = new Manager(conf.io.url, conf.io.options)
            const socket = manager.socket("/chat")
            socket.emit("join", {room: company})
            socket.emit("register", {content: {...auth?.client}})
            socket.on("message", async (msg: any) => {
                try {
                    if (!store.hasVal("chat")) store.setVal("chat", [])
                    if (msg?.sender?.phone !== auth?.client?.phone) {
                        notify({
                            id: "message",
                            body: msg?.content
                        })
                    }
                    store.addVal("chat", msg)
                    fetchMsg()
                    await sendToServer(msg)
                } catch (e) {
                    console.log(e.message)
                }
            })
            io.current = socket
        }
    }, [auth])

    const loadClient = useCallback(() => {
        const item = store.getVal("auth")
        if (item) getClient({variables: {id: item?.id}})
    }, [getClient])

    useEffect(() => {
        loadClient()
        loadIo()
        if (auth?.client) fetchMsg()
        return () => {
            if (io.current) io.current?.disconnect()
        }
    }, [loadClient, loadIo, company])


    if (errorClient) console.log(errorClient.message)
    return {t, send, msg: mapMsg, clearMsg, support, company, auth: auth?.client, loading: loadingClient}
}
export default useChat