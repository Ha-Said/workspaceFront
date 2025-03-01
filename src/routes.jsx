import { LoginPage } from './pages/login'
import './App.css'
import { RegisterPage } from './pages/register'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import{Landing} from './pages/landing'
function Routing() {

  return (
    <div className="App">


      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router> 
      </div>
  )
}

export default Routing
