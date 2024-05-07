import Signup from './components/Signup';
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import {useSelector,useDispatch} from "react-redux";
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
import { BASE_URL } from '.';
import ChangePass from './components/ChangePass';
import { BrowserRouter,Routes,Route } from 'react-router-dom';




function App() { 
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser){
      const socketio = io(`${BASE_URL}`, {
          query:{
            userId:authUser._id
          }
      });
      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socketio.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  },[authUser]);

  return (
    <div className="mob-screen p-4 h-screen flex items-center justify-center">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/resetpassword' element={<ChangePass/>}/>
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
