import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthToken, setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';
import {FaUser} from 'react-icons/fa';
import {FaLock} from 'react-icons/fa';


const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      navigate("/home");
      console.log(res.data)
      toast.success('logged in successfully.')
      dispatch(setAuthUser(res.data));
      dispatch(setAuthToken(res.data.token)) 
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }
  return(
    <div className='form-container wrapper relative w-[420px] h-[450px] rounded-lg text-white min-w-96 bg-transparent border-2 border-solid border-white border-opacity-10  backdrop-filter backdrop-blur-md' 
    >
     <div className='form-box login w-full p-10 '>
     <form onSubmit={onSubmitHandler}>
      <h1 className='text-3xl text-center mb-10 font-serif'>Login</h1>
      <div className='input-box relative h-6 w-full mt-5 mb-5'>
       <input className='input-field w-full h-full bg-transparent outline-0 border border-solid border-white border-opacity-10 rounded-3xl text-xl text-white placeholder-slate-300 p-6 ' type='text'
       placeholder='Username'
       value={user.username}
       onChange={(e) => setUser({ ...user, username: e.target.value })}
       required
       />
       <FaUser className='icon absolute right-5 top-1/2  text-xl text-slate-200 '/>
      </div>
      <div className='input-box relative h-6 w-full mt-12 mb-5'>
       <input 
       className='input-field w-full h-full bg-transparent outline-0 border border-solid border-white border-opacity-10 rounded-3xl text-xl text-white placeholder-slate-300 p-6'
       type='password'
       placeholder='Password'
       value={user.password}
       onChange={(e) => setUser({ ...user, password: e.target.value })}
       required
       />
       <FaLock className='icon absolute right-5 top-1/2 text-slate-200 text-xl'/>
      </div>
      <div className='forget-password mt-9 ml-3 '>
        <Link to='/resetpassword'>Forget Password?</Link>
      </div>
      <button type='submit' className='submit-button w-full h-10 bg-white border-none outline-none rounded-2xl cursor-pointer text-l text-black font-bold mt-6 mb-4'>Login</button>
      <div className='register-link text-center '>
       <p>Don't have an account? <Link to="/signup">Register</Link></p>
      </div>
     </form>
     </div>
    </div>
  )
    
}

export default Login





