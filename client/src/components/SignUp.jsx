import React, { useState } from 'react'

const SignUp = () => {
    const [inputs,setInputs]= useState({
        firstname:"",
        lastname:"",
        email:"",
        password:""
    });

    const{firstname, lastname, email, password}=inputs;

    const onChange=(e)=>{
        setInputs({...inputs, [e.target.name]:e.target.value});
    };

    const submit =async(e)=>{
        e.preventDefault();
        try {
            const body ={firstname, lastname, email, password }
            const response = await fetch("http://localhost:5018/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });
            const parseRes=await response.json();
            console.log(parseRes);
            
        } catch (err) {
            console.error(err.message);
        }
    }

  return (
    <>
       <h1 className='text-center my-5'> Sign Up</h1>
       <div className="container">
           <div className='col-9'>
                <form action="" onSubmit={submit}>
                    <input type="text" className="form-control my-3" name='firstname' 
                    placeholder='Name' value={firstname} onChange={(e)=>onChange(e)} />

                    <input type="text" className="form-control my-3" name='lastname' 
                    placeholder='Name' value={lastname} onChange={(e)=>onChange(e)}/> 

                    <input type="email" className="form-control my-3" name='email' 
                    placeholder='Email' value={email} onChange={(e)=>onChange(e)}/>

                    <input type="password" className="form-control my-3" name='password' 
                    placeholder='Password' value={password} onChange={(e)=>onChange(e)}/>

                    <button className="btn btn-success btn-block">Submit</button>
                </form>
           </div>
       </div>
    </>
  )
}

export default SignUp