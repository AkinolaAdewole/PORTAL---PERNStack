import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SignUp = ({setAuth}) => {
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

    // const submit =async(e)=>{
    //     e.preventDefault();
    //     try {
    //         const body ={firstname, lastname, email, password }
    //         const response = await fetch("http://localhost:5020/register",{
    //             method:"POST",
    //             headers:{"Content-Type":"application/json"},
    //             body:JSON.stringify(body)
    //         });
    //         const parseRes=await response.json();
    //         console.log(parseRes);

    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }

    const submit = async (e) => {
        e.preventDefault();
        try {
          const body = { firstname, lastname, email, password };
          const response = await fetch("http://localhost:5020/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
      
          if (!response.ok) {
            // Handle the case when the response status is not 2xx (e.g., 401, 500, etc.)
            const errorMessage = await response.text();
            console.error(`Error: ${response.status} - ${errorMessage}`);
          } else {
            // Registration successful
            const parseRes = await response.json();

            localStorage.setItem("token",parseRes.token)
            setAuth(true);
            console.log(parseRes);
          }
        } catch (err) {
          console.error(`Error: ${err.message}`);
        }
      };
      

  return (
    <>
       <h1 className='text-center my-5'> Sign Up</h1>
       <div className="container">
           <div className='col-9'>
                <form action="" onSubmit={submit}>
                    <input type="text" className="form-control my-3" name='firstname' 
                    placeholder='Firstame' value={firstname} onChange={(e)=>onChange(e)} />

                    <input type="text" className="form-control my-3" name='lastname' 
                    placeholder='Lastname' value={lastname} onChange={(e)=>onChange(e)}/> 

                    <input type="email" className="form-control my-3" name='email' 
                    placeholder='Email' value={email} onChange={(e)=>onChange(e)}/>

                    <input type="password" className="form-control my-3" name='password' 
                    placeholder='Password' value={password} onChange={(e)=>onChange(e)}/>

                    <button className="btn btn-success btn-block">Submit</button>
                </form>
                <Link>Login</Link>
           </div>
       </div>
    </>
  )
}

export default SignUp