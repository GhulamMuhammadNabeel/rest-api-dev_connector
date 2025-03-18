import React, { useState } from 'react'
import axios from 'axios'
const Register = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [password2, setpassword2] = useState('')
  const [errors, seterrors] = useState({})

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newUser={
        name: name,
        email: email,
        password: password,
        password2: password2,
    }
    try {
      const res = await axios.post("/api/users/register", newUser);
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || "An error occurred");
    }
  };

  return (
    <div className="register">
  <div className="container">
    <div className="row">
      <div className="col-md-8 mx-auto">
        <h1 className="display-4 text-center">Sign Up</h1>
        <p className="lead text-center">Create your DevConnector account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control form-control-lg" placeholder="Name" onChange={(e)=>setname(e.target.value)} value={name} name="name" />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control form-control-lg" placeholder="Email Address" onChange={(e)=>setemail(e.target.value)} value={email} name="email" />
            <small className="form-text text-muted">This site uses Gravatar, so if you want a profile image, use a Gravatar email.</small>
          </div>
          <div className="mb-3">
            <input type="password" className="form-control form-control-lg" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} value={password} name="password" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" onChange={(e)=>setpassword2(e.target.value)} value={password2} name="password2" />
          </div>
          <input type="submit" className="btn btn-info w-100 mt-4" value="Sign Up" />
        </form>
      </div>
    </div>
  </div>
</div>

  )
}

export default Register