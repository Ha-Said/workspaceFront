import { LoginPage } from './pages/login'

import { RegisterPage } from './pages/register'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import{Landing} from './pages/landing'
import { Dashboard } from './templates/Dashboard'
import { Community } from './templates/community'
import './App.css'
import {CalendarApp} from "./components/Schedule"
function Routing() {

  return (
    <div className="App">


      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Landing />} />

          <Route element={<Dashboard/>}>
          <Route path='/community' element={<Community/>}/>
          <Route path='/schedule' element={<CalendarApp/>}/>
          </Route>
        </Routes>
      </Router> 
      </div>
  )
}

export default Routing
