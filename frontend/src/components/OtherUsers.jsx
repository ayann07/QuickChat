import React, { useEffect } from 'react'
import OtherUser from './OtherUser';

import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import { BASE_URL } from '..';
import { setOtherUsers } from '../redux/userSlice';


const OtherUsers = () => {

    const dispatch = useDispatch();
    const { authToken } = useSelector(store => store.user);
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/v1/user`,{
                    headers:{
                        Authorization:authToken
                    }
                });
                console.log("other users -> ",res);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, [])

    const {otherUsers} = useSelector(store=>store.user);
    if (!otherUsers) return; 
     
    return (
        <div className='overflow-auto flex-1 other-users-container'>
            {
                otherUsers?.map((user)=>{
                    return (
                        <OtherUser key={user._id} user={user}/>
                    )
                })
            }
            
        </div>
    )
}

export default OtherUsers