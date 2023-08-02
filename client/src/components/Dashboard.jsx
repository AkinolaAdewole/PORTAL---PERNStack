import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Dashboard = ({setAuth}) => {
    const [name,setName]= useState("");

    const getProfile=async()=>{
        try {
            const res = await fetch ("http://localhost:5020/dashboard",{
                method:"GET",
                headers:{jwt_token:localStorage.token}
            });
            const parseData = await res.json();
            setName(parseData.user_name);

        } catch (err) {
            console.error(err.message);
        }
    }

    const logout=async(e)=>{
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setAuth(false);
            toast.success("Lofout successfully");
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(()=>{
        getProfile();
    },[]);
  return (
    <>
       <h1 className='mt-5'></h1>
       <h2>Welcome {name}</h2>

            <button onClick={()=>setAuth(false)} className='btn btn-primary'>
                Logout
            </button>
    </>
  )
}

export default Dashboard