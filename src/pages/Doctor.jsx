import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';


const Doctor = () => {
   const { speciality } = useParams()
   const { doctors } = useContext(AppContext)
   const [filterDoc, setFilterDoc] = useState([]);
   const navigate = useNavigate()

   const applyFilter = () => {
      if (speciality) {
         setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
      } else {
         setFilterDoc(doctors);
      }
   }
   useEffect(() => {
      applyFilter();
   }, [doctors, speciality])


   return (
      <div>
         <p className='text-gray-600'>Browse through the doctors specialist.</p>
         <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
            <div className='flex  flex-col gap-4 text-sm text-gray-600 '>
               <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician"? "bg-indigo-100 text-black":"" }`}>General physician</p>
               <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : "" }`}>Gynecologist</p>
               <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : "" }`}>Dermatologist</p>
               <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : "" }`}>Pediatricians</p>
               <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : "" }`}>Neurologist</p>
               <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : "" }`}>Gastroenterologist</p>
            </div>
            <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
               {
                  filterDoc.map((item, index) => (
                     <div className='border border-b-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px]  transition-all duration-500' key={index} onClick={() => navigate('/appointment/${item._id}')}>
                        <img className='bg-blue-50' src={item.image} alt="error" />
                        <div className='p-4'>
                           <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                              <p className='w-2 h-2 rounded-full bg-green-500'></p><p>Available</p>
                           </div>
                           <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                           <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>

                     </div>
                  ))
               }
            </div>
         </div>
      </div>
   )
}

export default Doctor