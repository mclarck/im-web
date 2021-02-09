import React from "react";
import style from "./style.module.css";
import {ChatBox} from "im-ui-chat";
import useChat from "../../controllers/useChat";
import {BiSupport} from "react-icons/bi"

const Chat = (props: any) => {
    const {support, clearMsg, msg, send} = useChat()
    return (
        <div className={style.Chat}>
            <ChatBox icon={<BiSupport/>} title={support} messages={msg()} onClose={clearMsg} onSend={send}/>
        </div>
    );
};
export default Chat;
