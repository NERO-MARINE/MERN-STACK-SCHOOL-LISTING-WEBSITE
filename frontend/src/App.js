import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import SearchPage from "./pages/searchPage/SearchPage";
import School from "./pages/school/School";
import Login from "./pages/login/Login";
import Dashboard from "./pages/userDashboard/Dashboard";
import Register from "./pages/register/Register";
import SchoolUpdate from "./pages/schoolUpdate/SchoolUpdate";

function App() {
  return (
    <div className="App">
         <BrowserRouter>
         <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/school/:id" element={<School/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/update-school" element={<SchoolUpdate/>}/>
         </Routes>
         </BrowserRouter>
    </div>
  );
}

export default App;
