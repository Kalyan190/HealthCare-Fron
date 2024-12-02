import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_frontend/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx';
import { toast } from 'react-toastify';


const Navbar = () => {
   const navigate = useNavigate();
   
   const [showmenu, setShowmenu] = useState(false);
   const {token, setToken,userData} = useContext(AppContext)

   const logout = ()=> {
      toast.success("Logout successfully.")
      navigate('/')
      setToken(false);
      localStorage.removeItem('token')
   }
   console.log("token: ",token)

   return (
      <div className='flex items-center justify-between text-sm py-4 mb-5 border-gray-400 border-b'>
         <img onClick={()=>{navigate('/')}} className='w-44 cursor-pointer' src={assets.logo} alt="" />
         <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
               <li className='py-1'>HOME</li>
               <hr className='border-none outline-none h-0.5 bg-primary m-auto' hidden />
            </NavLink>
            <NavLink to='/doctors'>
               <li className='py-1'>ALL DOCTORS</li>
               <hr className='border-none outline-none h-0.5 bg-primary m-auto' hidden />
            </NavLink>
            <NavLink to='/about'>
               <li className='py-1'>ABOUT</li>
               <hr className='border-none outline-none h-0.5 bg-primary m-auto' hidden />
            </NavLink>
            <NavLink to='/contact'>
               <li className='py-1'>CONTACT</li>
               <hr className='border-none outline-none h-0.5 bg-primary m-auto' hidden />
            </NavLink>
         </ul>
         <div className='flex items-center gap-4'>
            {token && userData ? <div className='flex items-center gap-2 cursor-pointer group relative'>
               <img className='w-10 h-10 rounded-full border-2 border-primary shadow-lg' src={userData.image} alt="profileimage error" />
               <img className='w-2.5' src={assets.dropdown_icon} alt="" />
               <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block' > 
                  <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                     <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                     <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                     <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                  </div>
               </div>

            </div> : <button className='bg-primary text-white px-8 py-3 rounded-full hidden md:block' onClick={() => navigate('/signup')}>
               Create account</button>}

               <img onClick={()=>setShowmenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="error" />

               {/*---------mobile menu-------------*/ }
               <div className={`${showmenu? 'fixed w-full': 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}>
               <div className='flex items-center justify-between px-5 py-6 '>
               <img className='w-36' src={assets.logo} alt="error" />
               <img className='w-7 cursor-pointer' onClick={()=>setShowmenu(false)} src={assets.cross_icon} alt="error" />
               </div>
               <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                  <NavLink onClick={() => setShowmenu(false)} to='/'><p className='px-4 py-2 inline-block rounded'>HOME</p></NavLink>
                  <NavLink onClick={() => setShowmenu(false)} to='/doctors'><p className='px-4 py-2 inline-block rounded' >ALL DOCTORS</p></NavLink>
                  <NavLink onClick={() => setShowmenu(false)}  to='/about'><p className='px-4 py-2 inline-block rounded' >ABOUT</p></NavLink>
                  <NavLink onClick={() => setShowmenu(false)} to='/contact' ><p className='px-4 py-2 inline-block rounded' >CONTACT</p></NavLink>
               
               </ul>
               </div>

         </div>
      </div>
   )
}

export default Navbar
