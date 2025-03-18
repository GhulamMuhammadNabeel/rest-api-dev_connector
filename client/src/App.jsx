import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Register from './components/layout/auth/Register'
import Login from './components/layout/auth/Login'
import { Provider } from 'react-redux'
import store from './store'
function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
