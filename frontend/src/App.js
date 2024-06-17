import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Myprofile from "./Myprofile";
import Indprofile from "./Indprofile";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/dashboard' element={<Dashboard />} /> 
          <Route exact path='/myprofile' element={<Myprofile />} /> 
          <Route exact path="/profile/:id" element={<Indprofile />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
