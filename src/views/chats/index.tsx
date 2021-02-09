import React from "react";
import style from "./style.module.css";
import useChat from "../../controllers/useChat";
import {Avatar} from "im-ui-core";
import _ from "lodash";
import {ChatBox} from "im-ui-chat";
import {BiSupport} from "react-icons/bi";

const Chats = (props: any) => {
    const {onLines, mapMsg, pickDest, title, clearMsg, send} = useChat()
    return (
        <div className={style.Chats}>
            <div className={style.users}>
                {_.map(onLines, (onLine, idx) => {
                    if (!onLine.phone) return null
                    return (
                        <div key={idx} className={style.user}>
                            <div className={style.avatar} onClick={() => pickDest(onLine)}><Avatar/></div>
                            <button type="button" className={style.infos} onClick={() => pickDest(onLine)}>
                                <div className={style.username}>@{onLine.username}</div>
                                <div className={style.phone}>{onLine.phone}</div>
                            </button>
                        </div>
                    )
                })}
            </div>
            <div className={style.chat}>
                <ChatBox
                    icon={<BiSupport/>}
                    title={title}
                    messages={mapMsg()}
                    onClose={clearMsg}
                    onSend={send}/>
            </div>
        </div>
    );
};
export default Chats;
