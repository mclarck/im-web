import {useContext, useEffect, useState} from "react"
import {Manager} from "socket.io-client"
import conf from "../../resources/conf";
import {useParams} from "react-router-dom";
import {RestClient, Store} from "../database";
import {Howl} from 'howler';

const useIO = () => {
    const {company} = useParams<any>()
    const [chat, setChat] = useState<any>()
    const [anal, setAnal] = useState<any>()
    const store = new Store(company)
    const rest = useContext(RestClient)
    const [sender] = useState<any>(() => store.getVal("auth"))

    const playNotice = () => {
        const sound = new Howl({src: ['/audio/system.mp3']});
        sound.play()
    }
    const onError = (e: any) => console.log(e.message)
    const sendMsgToServer = async (msg: any) => {
        try {
            return await rest?.request("POST", "/api/chats", msg)
        } catch (e) {
            console.log(e.message)
            return e
        }
    }
    const onJoin = (payload: any) => {
        console.log('joined from chat')
    }
    const onMsg = (payload: any) => {
        if (!store.hasVal("chat")) store.setVal("chat", [])
        store.addVal("chat", payload)
        const notify = () => {
            if (payload?.sender?.phone !== company) {
                playNotice()
            }
        }
        sendMsgToServer(payload).then(res => notify()).catch(onError)
    }
    const onAnalEvent = (payload: any) => {
        const status = payload?.content?.status
        const id = payload?.content?.id
        playNotice()
    }
    const handleChat = (socket: SocketIOClient.Socket) => {
        // we need to join a room
        // client need to join his phone
        console.log(sender)
        socket.emit("join", {room: sender?.phone})
        socket.emit("register", {content: sender})
        socket.on("join", onJoin)
        socket.on("message", onMsg)
    }
    const handleAnal = (socket: SocketIOClient.Socket) => {
        socket.emit("join", {room: "analytic@" + company})
        socket.on("message", onAnalEvent)
    }
    const cleanChat = (socket: SocketIOClient.Socket) => {
        if (socket) {
            socket.off("join", onJoin)
            socket.off("message", onMsg)
            socket.disconnect()
        }
    }
    const cleanAnal = (socket: SocketIOClient.Socket) => {
        if (socket) {
            socket.off("message", onAnalEvent)
            socket.disconnect()
        }
    }

    useEffect(() => {
        const manager = new Manager(conf.io.url, conf.io.options)
        const chat = manager.socket("/chat")
        const anal = manager.socket("/analytic")
        handleChat(chat)
        handleAnal(anal)
        setChat(chat)
        setAnal(anal)
        return () => {
            cleanChat(chat)
            cleanAnal(anal)
        }
    }, [])

    return {chatIO: chat, analyticIO: anal}
}

export default useIO