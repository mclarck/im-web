import {useContext, useEffect, useState} from "react"
import {Manager} from "socket.io-client"
import conf from "../../resources/conf";
import {store as notice} from "react-notifications-component";
import {useParams} from "react-router-dom";
import {RestClient, Store} from "../database";
import {Howl} from 'howler';

const useIO = () => {
    const {company} = useParams<any>()
    const [sender] = useState<any>(() => ({username: company, email: company, phone: company}))
    const [chat, setChat] = useState<any>()
    const [anal, setAnal] = useState<any>()
    const store = new Store(company)
    const rest = useContext(RestClient)

    const playMsg = ()=>{
        const msg = new Howl({ src: ['/audio/message.mp3','/audio/message.ogg','/audio/message.m4r'] });
        msg.play()
    }
    const playSystem = ()=>{
        const system = new Howl({ src: ['/audio/system.mp3','/audio/system.ogg','/audio/system.m4r'] });
        system.play()
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
        notice.addNotification({
            message: `new user joined chat`,
            type: "info",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
        });
    }
    const onMsg = (payload: any) => {
        if (!store.hasVal("chat")) store.setVal("chat", [])
        store.addVal("chat", payload)
        const notify = () => {
            if (payload?.sender?.phone !== company) {
                playMsg()
                notice.addNotification({
                    title: `new message from @${payload?.sender?.username}`,
                    message: `${payload?.content}`,
                    type: "info",
                    insert: "bottom",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                });
            }
        }
        sendMsgToServer(payload).then(res => notify()).catch(onError)
    }
    const onAnalEvent = (payload: any) => {
        const status = payload?.content?.status
        const id = payload?.content?.id
        playSystem()
        notice.addNotification({
            title: `${payload?.sender?.username}`,
            message: `order ${id} is ${status}`,
            type: "success",
            insert: "bottom",
            container: "bottom-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
        });
    }
    const handleChat = (socket: SocketIOClient.Socket) => {
        // we need to join a room
        // client need to join his phone
        socket.emit("join", {room: company})
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