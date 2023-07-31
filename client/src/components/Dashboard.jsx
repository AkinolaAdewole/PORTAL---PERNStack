import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const [name,setName]= useState("");
    const getProfile=async()=>{
        try {
            const res = await fetch ("http://localhost:5000/dashboard",{
                method:"POST",
                headers:{jwt_token:localStorage.token}
            });
            const parseData = await res.json();
            setName(parseData.user_name);
        } catch (err) {
            console.error(err.message);
        }
    }
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard