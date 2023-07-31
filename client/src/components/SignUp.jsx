import React from 'react'

const SignUp = () => {
  return (
    <>
       <h1 className='text-center my-5'> Sign Up</h1>
       <div className="container">
        <form action="">
            <input type="text" className="form-control my-3" name='firstname' placeholder='Name'/>
            <input type="text" className="form-control my-3" name='lastname' placeholder='Name'/>
            <input type="email" className="form-control my-3" name='email' placeholder='Email'/>
            <input type="password" className="form-control my-3" name='password' placeholder='Password'/>
            <button className="btn btn-success btn-block">Submit</button>
        </form>
       </div>
    </>
  )
}

export default SignUp