import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/diveButtons.css'
const Landing = () => {
  return (

    <div>
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector</h1>
                <p className="lead">
                  Create a developer profile/portfolio, share posts and get help from other developers
                </p>
                <hr />
                <div className="d-flex-block gap-4">
                  <Link to="/register">
                    <button className="landing-button me-4">
                      <span> Dive In 🚀
                      </span>
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="landing-button">
                      <span> LogIn
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Landing