import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';
import { FaUser } from 'react-icons/fa';
import { BsPersonCircle } from "react-icons/bs";
import {FaLock} from 'react-icons/fa';
const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }
  return (
    <div className="wrapper relative w-[420px] h-[500px] rounded-lg text-white min-w-96 bg-transparent border-2 border-solid border-white border-opacity-10  backdrop-filter backdrop-blur-md">
      <div className='form-box login w-full p-4'>
      <form onSubmit={onSubmitHandler}>
      <h1 className='text-3xl text-center mb-5 font-serif'>Register</h1>
      <div className='input-box relative h-6 w-full mt-5 mb-5'>
       <input className='w-full h-full bg-transparent outline-0 border border-solid border-white border-opacity-10 rounded-3xl text-xl text-white placeholder-slate-300 p-6 ' type='text'
       placeholder='Full name'
       value={user.fullName}
       onChange={(e) => setUser({ ...user, fullName: e.target.value })}
       required
       />
       <BsPersonCircle className='icon absolute right-5 top-1/2  text-xl text-slate-200 '/>
      </div>
      <div className='input-box relative h-6 w-full mt-9 mb-9'>
       <input className='w-full h-full bg-transparent outline-0 border border-solid border-white border-opacity-10 rounded-3xl text-xl text-white placeholder-slate-300 p-6 ' type='text'
       placeholder='Username'
       value={user.username}
       onChange={(e) => setUser({ ...user, username: e.target.value })}
       required
       />
       <FaUser className='icon absolute right-5 top-1/2  text-xl text-slate-200 '/>
      </div>
      <div className='input-box relative h-6 w-full mt-5 mb-5'>
       <input className='w-full h-full bg-transparent outline-0 border border-solid border-white border-opacity-10 rounded-3xl text-xl text-white placeholder-slate-300 p-6 ' type='password'
       placeholder='Password'
       value={user.password}
       onChange={(e) => setUser({ ...user, password: e.target.value })}
       required
       />
       <FaLock className='icon absolute right-5 top-1/2  text-xl text-slate-200 '/>
      </div>
      <div className='input-box relative h-6 w-full mt-9 mb-9'>
       <input className='w-full h-full bg-transparent outline-0 border border-solid border-white border-opacity-10 rounded-3xl text-xl text-white placeholder-slate-300 p-6 ' type='password'
       placeholder='Confirm Password'
       value={user.confirmPassword}
       onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
       required
       />
       <FaLock className='icon absolute right-5 top-1/2  text-xl text-slate-200 '/>
        </div>
          <div className='flex items-center my-4 mt-9 ml-5'>
            <div className='flex items-center'>
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="checkbox mx-2 border-solid" />
            </div>
            <div className='flex items-center'>
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox mx-2 border-solid" />
            </div>
          </div>
          <div className='terms-conditions flex ml-3'>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="checkbox mx-2" 
                required/>
                <p>I agree to the terms & conditions</p>
            </div>
          <button type='submit' className='w-full h-10 bg-white border-none outline-none rounded-2xl cursor-pointer text-l text-black font-bold mt-6 mb-4'>Register</button>
          <p className='text-center my-2'>Already have an account? <Link to="/"> login </Link></p>
          <div>
      
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup