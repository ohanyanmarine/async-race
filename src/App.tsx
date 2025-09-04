import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Garage from './App/view/Garage/Garage';
import Winners from './App/view/Winners/Winners';
import Header from './App/view/Header/Header';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </div>
  );
}

export default App;
