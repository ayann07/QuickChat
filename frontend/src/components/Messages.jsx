import React, { useEffect } from 'react'
import Message from './Message'

import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import axios from 'axios';
import { BASE_URL } from '..';


const Messages = () => {

    const {selectedUser,authToken} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser?._id}`,{
                 headers:{
                    Authorization:authToken
                 }
                });
                dispatch(setMessages(res.data))
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    }, [selectedUser?._id,setMessages]);
  

    const {socket} = useSelector(store=>store.socket);
    const {messages} = useSelector(store=>store.message);
    useEffect(()=>{
        socket?.on("newMessage", (newMessage)=>{
            dispatch(setMessages([...messages, newMessage]));
        });
        return () => socket?.off("newMessage");
    },[setMessages, messages]);


    return (
        <div className='px-4 flex-1 overflow-auto messages-padding'>
            {
               messages && messages?.map((message) => {
                    return (
                        <Message key={message._id} message={message} />
                    )
                })
            }

        </div>


    )
}

export default Messages