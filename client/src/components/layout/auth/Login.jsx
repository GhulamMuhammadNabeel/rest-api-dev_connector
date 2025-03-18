import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [errors, seterrors] = useState({})
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const LoggedInUser={
            email: email,
            password: password,
        }
        try {
          const res = await axios.post("/api/users/login", LoggedInUser);
          console.log(res.data);
        } catch (err) {
          seterrors(err.response?.data || {})
        }
      };
      // useEffect(() => {
      //   console.log(errors);
      // }, [errors]);
  return (
    <div className="login">
  <div className="container">
    <div className="row">
      <div className="col-md-8 mx-auto">
        <h1 className="display-4 text-center">Log In</h1>
        <p className="lead text-center">Sign in to your DevConnector account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="email" className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""}`} value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Email Address" name="email" />
          {errors.email && (<div className="invalid-feedback">
        {errors.email}
      </div>)}
          </div>
          <div className="mb-3">
            <input type="password" className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""}`} value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Password" name="password" />
          {errors.password && (<div className="invalid-feedback">
        {errors.password}
      </div>)}
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