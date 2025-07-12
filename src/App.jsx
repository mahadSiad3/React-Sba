import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Recommend from "./components/Recommend.jsx";

export default function App() {
  return (
    //<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend/>} />
      </Routes>
    //</Router>
  );
}