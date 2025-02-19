import React from "react";
import {HashRouter as Router,Routes,Route} from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddBook from "./components/AddBook";
import Edit from "./components/Edit";
import Profile from "./components/Profile";
import Reviews from "./components/Reviews";
import SubmitReview from "./components/SubmitReview";
import Viewbook from "./components/Viewbook";
import Notfound from "./components/Notfound";
function App(){
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/homepage" element={<Dashboard />}/>
          <Route path="/Viewbook" element={<Viewbook />}/>
          <Route path="/Reviews" element={<Reviews />}/>
          <Route path="/submitReview" element={<SubmitReview />}/>
          <Route path="/addBook" element={<AddBook />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/editProfile" element={<Edit />}/>
          <Route path="*" element={<Notfound />}/>
        </Routes>
      </div>
    </Router>
  )
}
export default App;