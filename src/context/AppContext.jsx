import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) =>{
   const currencySymbol = "$"
   const backendUrl = import.meta.env.VITE_BACKEND_URL
   const [doctors,setDoctors] = useState([])
   const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'):false)
   const [userData,setUserData] = useState(false)
   const [loading,setLoading] = useState(false)
   

   const loadUserProfileData = async()=>{
      try {
         const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})

         if(data.success){
            setUserData(data.userData)
         }else{
            toast.error(data.message)
         }
      } catch (error) {
         console.error(error);
         toast.error(error.message)
      }
   }
   
   const getAllDoctorsData = async ()=>{
      try {
         const {data} = await axios.get(backendUrl + '/api/doctor/list')
         
         if(data.success){
            setDoctors(data.doctors)
         }else{
            toast.error(data.message)
         }

      } catch (error) {
         console.error(error);
         toast.error(error.message)
         
      }
   }

   const value = {
      doctors,
      getAllDoctorsData,
      currencySymbol,
      token,
      setToken,
      backendUrl,
      userData,
      setUserData,
      loadUserProfileData,
      loading,
      setLoading
   }


   useEffect(()=>{
       getAllDoctorsData()
   },[])

   useEffect(()=>{
      if(token){
         loadUserProfileData();
      }else{
         setUserData(false)
      }
      
   },[token])

   return (
      <AppContext.Provider value={value}>
      {props.children}
      </AppContext.Provider>
   )
}

export default AppContextProvider;