import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./Home/Home";
import Suduko from './Components/Suduko'
import Navbar from './Components/Navbar/Navbar';
const App = () => {
  return (
    <div>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/suduko' element={<Suduko/>} /> 
      </Routes>
    </div>
  );
};

export default App;
