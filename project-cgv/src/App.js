import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import NotFound from "./components/Main/NotFound";
import Register from "./page/Register";
import Login from "./page/Login";
import Admin from "./admin/Admin";
import MovieDetail from "./page/MovieDetail";
import ListMovie from "./page/ListMovie";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/moviedetail/:id" element={<MovieDetail />}></Route>
        <Route path="/listmovie" element={<ListMovie />}></Route>




        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
