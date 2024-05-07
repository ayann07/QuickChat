import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';
import {FaUser} from 'react-icons/fa';
import {FaLock} from 'react-icons/fa';


const ChangePass = () => {
  const [user, setUser] = useState({
    username: "",
    current_password: "",
    new_password:"",
    confirm_pass:""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(user.new_password !== user.confirm_pass)
        {
            toast.error('Confirm Password do not match!')
            return
        }
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/change`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      navigate("/");
      toast.success("Password changed successfully!")
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
        username: "",
        current_password: "",
        new_password:"",
        confirm_pass:""
    })
  }
  return(
    <div className='wrapper relative w-[420px] h-[490px] rounded-lg text-white min-w-96 bg-transparent border-2 border-solid border-white border-opacity-10  backdrop-filter backdrop-blur-md' 
    >
     <div className='form-box login w-full p-7 '>
     <form onSubmit={onSubmitHandler}>
      <h1 className='text-3xl text-center mb-10 font-serif'>Reset Password</h1>
      <div className='input-box relative h-6 w-full mt-5 mb-5'>
       <input className='w-full h-full bg-transparent outline-0 border border-solid border-white border-opacity-10 rounded-3xl text-xl text-white placeholder-slate-300 p-6 ' type='text'
       placeholder='Username'
       value={user.username}
       onChange={(e) => setUser({ ...user, username: e.target.value })}
       required
       />
       <FaUser className='icon absolute right-5 top-1/2  text-xl text-slate-200 '/>
      </div>
      <div className='input-box relative h-6 w-full mt-12 mb-5'>
       <input 
       className='w-full h-full bg-transparent outline-0 border border-solid border-white border-opacity-10 rounded-3xl text-xl text-white placeholder-slate-300 p-6'
       type='password'
       placeholder='Current Password'
       value={user.current_password}
       onChange={(e) => setUser({ ...user, current_password: e.target.value })}
       required
       />
       <FaLock className='icon absolute right-5 top-1/2 text-slate-200 text-xl'/>
      </div>
      <div className='input-box relative h-6 w-full mt-12 mb-5'>
       <input 
       className='w-full h-full bg-transparent outline-0 border border-solid border-white border-opacity-10 rounded-3xl text-xl text-white placeholder-slate-300 p-6'
       type='password'
       placeholder='New Password'
       value={user.new_password}
       onChange={(e) => setUser({ ...user, new_password: e.target.value })}
       required
       />
       <FaLock className='icon absolute right-5 top-1/2 text-slate-200 text-xl'/>
      </div>
      <div className='input-box relative h-6 w-full mt-12 mb-5'>
       <input 
       className='w-full h-full bg-transparent outline-0 border border-solid border-white border-opacity-10 rounded-3xl text-xl text-white placeholder-slate-300 p-6'
       type='password'
       placeholder='Confirm New Password'
       value={user.confirm_pass}
       onChange={(e) => setUser({ ...user, confirm_pass: e.target.value })}
       required
       />
       <FaLock className='icon absolute right-5 top-1/2 text-slate-200 text-xl'/>
      </div>
      <button type='submit' className='w-full h-10 bg-white border-none outline-none rounded-2xl cursor-pointer text-l text-black font-bold mt-6 mb-2'>Submit</button>
      <div className='Back-login text-center mt-2 '>
       <p>Do not want to change password?<Link to="/">Back to login</Link></p>
      </div>
     </form>
     </div>
    </div>
  )
    
}

export default ChangePass