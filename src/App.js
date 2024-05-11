import "./App.css";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import {Routes, Route} from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Routes>
<Route path="/" element={<Login/>} />
<Route path="/signup" element={<Signup/>} />
      </Routes>
      {/* <Login />
      <Signup /> */}
    </div>
  );
}

export default App;
