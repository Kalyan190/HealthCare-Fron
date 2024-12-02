import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SignUp = () => {

   const { token, setToken, backendUrl } = useContext(AppContext)
   const navigate = useNavigate()

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [name, setName] = useState('')



   const onSubmitHandler = async (event) => {
      event.preventDefault()

      try {

         if (!name) {
            return toast.error("Please enter the name.")
         } else if (!email) {
            return toast.error("Please enter the email.")
         } else if (!password) {
            return toast.error("Please enter the password.")
         }
         const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })

         if (data.success) {
            navigate('/login')
            toast.success(data.message);

         } else {
            toast.error(data.message)
         }

      } catch (error) {
         console.error("Error in form submission:", error);

         const errorMessage =
            error.response && error.response.data && error.response.data.message
               ? error.response.data.message
               : "Something went wrong. Please try again.";
         toast.error(errorMessage);
      }



   }

   return (
      <div className='flex w-full'>
         <div className='hidden lg:flex h-[80vh] w-1/2 items-center justify-center relative'>
            <DotLottieReact
               src="https://lottie.host/298372bb-21da-4d35-afb2-e88e94606887/iMeptCpU8z.lottie"
               loop
               autoplay
            />


         </div>
         <div className='w-full flex items-center justify-center lg:w-1/2'>
            <div className='w-11/12 max-w-[600px] px-10 py-3 max-sm:px-4 rounded-3xl bg-white border-2 border-gray-100 max-sm:text-center'>
               <h1 className='text-5xl max-sm:text-3xl font-semibold'>Welcome Back</h1>
               <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter you details.</p>
               <div className='mt-4 max-sm:text-left'>

                  <div className='flex flex-col'>
                     <label className='text-lg font-medium' htmlFor='name'>Name</label>
                     <input
                        className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                        placeholder="Enter your name" type='text' onChange={(e) => setName(e.target.value)} value={name} required id='name' />
                  </div>
                  <div className='flex flex-col'>
                     <label className='text-lg font-medium' htmlFor='email' >Email</label>
                     <input
                        className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                        placeholder="Enter your email" type='email' onChange={(e) => setEmail(e.target.value)} value={email} required id='email' />
                  </div>
                  <div className='flex flex-col mt-4'>
                     <label className='text-lg font-medium' htmlFor='password'>Password</label>
                     <input
                        className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                        placeholder="Enter your password"
                        type='password'
                        onChange={(e) => setPassword(e.target.value)} value={password} required id='password'
                     />
                  </div>


                  <div className='mt-4 flex flex-col gap-y-4'>
                     <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-2 bg-violet-500 rounded-xl text-white font-bold text-lg' onClick={onSubmitHandler}  >Sign Up</button>
                  </div> :


                  <div className=' flex justify-center items-center max-sm:flex-col '>
                     <p className='font-medium  text-base'>Already have an account?</p>
                     <button
                        className='ml-2 font-medium text-base text-violet-500' onClick={() => {
                           navigate('/login')
                        }}>Login</button>
                  </div>
               </div>
            </div>
         </div>

      </div>

   )
}

export default SignUp
