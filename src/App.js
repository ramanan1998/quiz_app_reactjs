import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home></Home>}></Route>
          <Route path="quiz" element={<Quiz></Quiz>}></Route>
        </Route>
      </Routes>
    </Router>
  )
}