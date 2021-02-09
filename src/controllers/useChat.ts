import {useLocale} from "im-hooks";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Store} from "../services/database";
import moment from "moment";
import _ from "lodash";
import translations from "../resources/translations";
import {ChatIO} from "../services/io/IOProvider";


const useChat = () => {

    const {t, lang} = useLocale(translations)
    const {company} = useParams<any>()
    const support = `${company}@${t("support")}`
    const [msg, setMsg] = useState<any>()
    const [sender] = useState<any>(() => ({username: company, email: company, phone: company}))
    const [onLines, setOnLines] = useState<any>()
    const [dest, setDest] = useState<any>()
    const store = new Store(company)
    const chatIO = useContext(ChatIO)

    const isMsgWithCurrentDest = (m: any) => {
        if ((m?.sender?.phone === dest?.phone && m?.dest?.phone === sender?.phone) ||
            (m?.sender?.phone === sender?.phone && m?.dest?.phone === dest?.phone)) {
            return true
        }
        return false
    }
    const filterMsg = () => _.filter(msg, (m) => isMsgWithCurrentDest(m))
    const mapMsg = () => _.map(filterMsg(), (m) => {
        const isSender = m?.sender?.phone === sender?.phone
        const created = moment(m?.created).locale(lang).calendar()
        return {...m, isSender, created}
    })

    const pickDest = (o: any) => setDest(o)

    const onLastUsers = (payload: any) => {
        setOnLines(Object.values(payload?.onlines))
    }

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
        if (dest) {
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
        if (chatIO) {
            chatIO.emit("register", {content: {...sender}})
            chatIO.on("last:users", onLastUsers)
            chatIO.on("message", onMsg)
        }
        fetchMsg()
        return () => {
            if (chatIO) {
                chatIO.off("last:users", onMsg)
                chatIO.off("message", onMsg)
                console.log('remove listeners')
            }
        }
    }, [])


    return {
        t,
        support,
        pickDest,
        onLines,
        send,
        filterMsg,
        msg: msg,
        mapped: mapMsg(),
        mapMsg,
        clearMsg,
        title: dest ? `${dest.username}@${dest.phone}` : support,
        company,
        auth: sender
    }
}
export default useChat