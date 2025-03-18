import React, { useState } from 'react'

const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const handleSubmit=(e)=>{
        e.preventDefault();
        const LoggedInUser={
            email: email,
            password: password,
        }
        console.log(LoggedInUser)
      }
  return (
    <div className="login">
  <div className="container">
    <div className="row">
      <div className="col-md-8 mx-auto">
        <h1 className="display-4 text-center">Log In</h1>
        <p className="lead text-center">Sign in to your DevConnector account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="email" className="form-control form-control-lg" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Email Address" name="email" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control form-control-lg" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Password" name="password" />
          </div>
          <input type="submit" className="btn btn-info w-100 mt-4" value="Log In" />
        </form>
      </div>
    </div>
  </div>
</div>


  )
}

export default Login