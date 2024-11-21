import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
   return (
      <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 '>
         <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-8 m-auto md:py-[10vw] md:mb-[-30px ]'>
            <p className='text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointments <br /> with Trusted Doctors
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm'>
               <img className='w-28 ' src={assets.group_profiles} alt="error" />
               <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block'/>schedule your appointment hassle-free.</p>
               
            </div>
            <a className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' href="#speciality">Book appointment <img className='w-3 ' src={assets.arrow_icon} alt="error" /></a>
         </div>
         <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg ' src={assets.header_img} alt="" />
         </div>
      </div>
   )
}

export default Header