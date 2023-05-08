import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Edit from './Components/Edit';
import Details from './Components/Details';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/edit/:id' element={<Edit />} />
      <Route path='/view/:id' element = {<Details/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
