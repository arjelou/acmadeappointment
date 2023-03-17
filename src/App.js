/* eslint-disable no-unused-expressions */
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/home';
import Index from './pages/index';

function App() {
  return (
<>
  <Routes>
    <Route path='' element={<Index />} />
    <Route path='/u' element={<Home />} />
    <Route path='*' element={<h1>Page Not Found!</h1>} />
  </Routes>
</>
);
}
export default App;
