import React from 'react'
import LoginForm from '../components/LoginForm'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Login = () => {
   

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
           <LoginForm />
     </div>
    
     </div>
  )
  
}

export default Login
