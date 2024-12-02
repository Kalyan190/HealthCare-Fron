import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {assets} from '../assets/assets_frontend/assets.js'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';

const MyProfile = () => {
   const {userData, setUserData,token,backendUrl,loadUserProfileData,loading,setLoading} = useContext(AppContext)
      

   const [isEdit, setIsEdit] = useState(false);
   const [image,setImage] = useState(false)

   const updateUserProfileData = async()=>{
       try {
         setLoading(true)
         const formData = new FormData();

         formData.append('name',userData.name)
          formData.append('phone', userData.phone)
          formData.append('address',JSON.stringify(userData.address))
          formData.append('gender', userData.gender)
          formData.append('dob', userData.dob)

          image && formData.append('image', image)

          console.log(userData.image && image);

          const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}})

          if(data.success){
            toast.success(data.message);
            await loadUserProfileData();
            setIsEdit(false)
            setImage(false)

          }else{
            toast.error(data.message)
          }
          

       } catch (error) {
         console.error(error)
         toast.error(error.message)
       }finally{
         setLoading(false)
       }
   }

   return (
   <>
      {loading && (
         <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
            <Loader className="animate-spin text-primary w-16 h-16" />
         </div>
      )}

      { userData && (
      <div className={`max-w-lg flex flex-col gap-2 text-sm ${loading ? 'opacity-45' : ''} `}>
         {
            isEdit ? <label htmlFor='images'>
                     <div className='inline-block relative cursor-pointer '>
                        <img className='w-32 h-32 rounded opacity-75 border-2 border-gray-300 shadow-lg ' src={image ? URL.createObjectURL(image) : userData.image} alt="Profile Preview" />
                  <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
               </div>
               <input onChange={(e) => setImage(e.target.files[0])} type="file" id='images' hidden />
                  </label> : <img className='w-32 h-32 rounded-full border-4 border-primary shadow-lg' src={userData.image} alt="Profile" />
         }


         {isEdit ? (
            <input
               type="text"
               onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
               value={userData.name}
               className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 ' />
         ) : (
            <p className='font-medium text-3xl text-neutral-800 mt-4 '>{userData.name}</p>
         )}
         <hr className='bg-zinc-400 h-0.5 border-none' />
         <div>
            <p className='text-neutral-500 underline mt-3  '>CONTACT INFORMATION</p>
            <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
               <p className='font-medium'>Email ID:</p>
               <p className='text-blue-500'>{userData.email}</p>

               <p className='font-medium'>Phone:</p>
               {isEdit ? (
                  <input
                     type="text"
                     onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                     value={userData.phone} className='bg-gray-100 max-w-52 '
                  />
               ) : (
                  <p className='text-blue-500'>{userData.phone}</p>
               )}

               <p className='font-medium'>Address:</p>
               {isEdit ? (
                  <p>
                     <input
                        type="text"
                        onChange={(e) =>
                           setUserData((prev) => ({
                              ...prev,
                              address: { ...prev.address, line1: e.target.value },
                           }))
                        }
                        value={userData.address.line1} className='bg-gray-100'
                     />
                     <br />
                     <input
                        type="text"
                        onChange={(e) =>
                           setUserData((prev) => ({
                              ...prev,
                              address: { ...prev.address, line2: e.target.value },
                           }))
                        }
                        value={userData.address.line2}
                        className='bg-gray-100'
                     />
                  </p>
               ) : (
                  <p className='text-gray-500'>
                     {userData.address.line1} <br />
                     {userData.address.line2}
                  </p>
               )}
            </div>
         </div>
         <div>
            <p className='text-neutral-500 underline mt-3  '>BASIC INFORMATION</p>
            <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
               <p className='font-medium'>Gender:</p>
               {isEdit ? (
                  <select className='bg-gray-100 max-w-20 '
                     onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                     value={userData.gender}
                  >
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                  </select>
               ) : (
                  <p className='text-gray-400'>{userData.gender}</p>
               )}
               <p className='font-medium'>Birthday:</p>
               {isEdit ? (
                  <input className='max-w-28 bg-gray-100'
                     type="date"
                     onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                     value={userData.dob}
                  />
               ) : (
                  <p className='text-gray-400'>{userData.dob}</p>
               )}
            </div>
         </div>
         <div className='mt-10'>
            {isEdit ? (
               <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={updateUserProfileData}>Save Information</button>
            ) : (
               <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
            )}
         </div>
      </div>
         )}
   </>
   
   
   );
};

export default MyProfile;
