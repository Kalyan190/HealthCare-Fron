import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const RealtedDoctors = ({speciality,docId}) => {
   const {doctors} = useContext(AppContext);
   const [relDoc,setRelDoc] = useState([]);
   const navigate = useNavigate();

   useEffect(()=>{
     if(doctors.length > 0 && speciality){
      const doctorData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId);

        setRelDoc(doctorData);

     }
   },[doctors,speciality,docId])


  return (
     <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium '>Top Doctors to Book</h1>
        <p className='text-sm text-center'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
           {
              relDoc.slice(0, 5).map((item, index) => (
                 <div className='border border-b-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px]  transition-all duration-500' key={index} onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}>
                    <img className='bg-blue-50' src={item.image} alt="error" />
                    <div className='p-4'>
                       <div className={`flex items-center gap-2 text-sm text-center ${item.avilability ? 'text-green-500' : 'text-gray-500'}`}>
                          <p className={`w-2 h-2 rounded-full ${item.availability ? 'bg-green-500' : 'bg-gray-500'}`}></p><p>{item.availability ? 'Available' : 'Not Available'}</p>
                       </div>
                       <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                       <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>

                 </div>
              ))
           }
        </div>
        <button className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10' onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}>more</button>
     </div>
  )
}

export default RealtedDoctors
