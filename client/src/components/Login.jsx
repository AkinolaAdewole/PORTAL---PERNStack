import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Login = ({setAuth}) => {
    const [inputs, setInputs]=useState({
        email:"",
        password:""
    });

    const {email,password}=inputs;

    const onChange=(e)=>{
        setInputs({...inputs, [e.target.name]:e.target.value});
    }

    const submitForm=async(e)=>{
        e.preventDefault();
        try {
            const body={email,password};
            const response = await fetch(
                "http://localhost:5018/login",
                {
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify(body)
                }
            );

            const parseRes=await response.json();
            if(parseRes.jwtToken){
                localStorage.setItem("token",parseRes.jwtToken);
                setAuth(true);
                toast.success("Logged in successfuly");
            } else{
                setAuth(false);
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err);
        }
    }
  return (
    <>
    </>
  )
}

export default Login