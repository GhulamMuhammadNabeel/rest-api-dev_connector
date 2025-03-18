import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
        
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
  <div className="container">
    <Link className="navbar-brand" to="/">DevConnector</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mobile-nav">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="mobile-nav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link" to="profiles">Developers</Link>
        </li>
      </ul>

      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

      </div>
  )
}

export default Navbar