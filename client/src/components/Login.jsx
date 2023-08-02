import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

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
                "http://localhost:5020/login",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(body)
                }
            );

            const parseRes=await response.json();
            console.log(parseRes);
                localStorage.setItem("token",parseRes.jwtToken);
                setAuth(true);
                toast.success("Logged in successfuly");
         
        } catch (err) {
            console.error(err);
        }
    }
  return (
    <>
       <div>
            <div>
                <div className='col-9 shadow-sm'>
                     <h2 className='text-center'>Login</h2>
                    <form action="" onSubmit={submitForm}>
                        <input type="text" name='email' 
                            placeholder='Email'
                            className='form-control my-3' 
                            value={email}
                            onChange={(e)=>onChange(e)}/>

                        <input type="text" name='password' 
                           placeholder='password'
                            className='form-control my-3' 
                            value={password}
                            onChange={(e)=>onChange(e)} 
                            />

                        <button className='btn btn-success'>Login</button>
                    </form>

                    <Link to='/'>Sign Up</Link>
                </div>
            </div>
       </div>
    </>
  )
}

export default Login 