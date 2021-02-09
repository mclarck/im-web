import {useLocale} from "im-hooks";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Store} from "../services/database";
import moment from "moment";
import _ from "lodash";
import translations from "../resources/translations";
import {ChatIO} from "../services/io/IOProvider";


const useChat = () => {
    const {locale} = useParams<any>()
    const {t, lang} = useLocale(translations, locale)
    const {company} = useParams<any>()
    const support = `${company}@${t("support")}`
    const [msg, setMsg] = useState<any>()
    const store = new Store(company)
    const chatIO = useContext(ChatIO)
    const [dest] = useState<any>(() => ({username: company, email: company, phone: company}))
    const [sender] = useState<any>(() => store.getVal("auth"))

    const isMsgWithCurrentDest = (m: any) => {
        return (m?.sender?.phone === dest?.phone && m?.dest?.phone === sender?.phone) ||
            (m?.sender?.phone === sender?.phone && m?.dest?.phone === dest?.phone);

    }
    const filterMsg = () => _.filter(msg, (m) => isMsgWithCurrentDest(m))
    const mapMsg = () => _.map(filterMsg(), (m) => {
        const isSender = m?.sender?.phone === sender?.phone
        const created = moment(m?.created).locale(lang).calendar()
        return {...m, isSender, created}
    })

    const onMsg = (payload: any) => {
        fetchMsg()
    }

    const clearMsg = () => {
        store.setVal("chat", [])
        fetchMsg()
    }

    const fetchMsg = () => {
        const chatMsg = store.getVal("chat");
        setMsg(chatMsg);
    }

    const send = (msg: any) => {
        if (dest && msg) {
            const payload = {
                sender: sender,
                dest: dest,
                room: company,
                created: moment().format(),
                content: msg
            }
            if (chatIO) chatIO.emit("message", payload)
        }
    }
    useEffect(() => {
        fetchMsg()
        if (chatIO) {
            chatIO.emit("register", {content: {...sender}})
            chatIO.on("message", onMsg)
        }
        return () => {
            if (chatIO) {
                chatIO.off("message", onMsg)
            }
        }
    }, [])
    return {
        t,
        support,
        send,
        filterMsg,
        msg,
        mapMsg,
        clearMsg,
        title: support,
        company,
        auth: sender
    }
}
export default useChat