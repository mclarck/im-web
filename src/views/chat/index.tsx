import React from "react";
import style from "./style.module.css";
import {ChatBox} from "im-ui-chat";
import useChat from "../../controllers/useChat";
import {BiSupport} from "react-icons/bi"

const Chat = (props: any) => {
    const {clearMsg, title, mapMsg, send} = useChat()
    return (
        <div className={style.Chat}>
            <ChatBox
                icon={<BiSupport/>}
                title={title}
                messages={mapMsg()}
                onClose={clearMsg}
                onSend={send}/>
        </div>
    );
};
export default Chat;
