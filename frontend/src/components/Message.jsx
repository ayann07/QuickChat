import React, { useEffect, useRef } from 'react'
import {useSelector} from "react-redux";

const Message = ({message}) => {
    const scroll = useRef();
    const {authUser,selectedUser} = useSelector(store=>store.user);

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);
       
     function extractTime(dateString) {
        const date = new Date(dateString);
        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());
        return `${hours}:${minutes}`;
    }
    
    function padZero(number) {
        return number.toString().padStart(2, "0");
    }

    const formattedTime = extractTime(message.createdAt);

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full user-pic">
                    <img alt="Tailwind CSS chat bubble component" src={message?.senderId === authUser?._id ? authUser?.profilePhoto  : selectedUser?.profilePhoto } />
                </div>
            </div>
            <div className={`chat-bubble chatmessages ${message?.senderId !== authUser?._id ? 'bg-gray-300 text-black' : ''} `}>{message?.message}</div>
            <div className="chat-footer">
                <time className="text-xs text-slate-300">{formattedTime}</time>
            </div>
        </div>
    )
}

export default Message