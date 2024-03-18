import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/Navigationbar';
import { Routes, Route } from 'react-router-dom';

// importing pages
import About from './pages/About';
import Home from './pages/Home';
import SVNTCOG from './pages/SVNTCOG';

function App() {
  return (
    <div className="App">
      <Navigationbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/svntcog' element={<SVNTCOG />}/>
      </Routes>
    </div>
  );
}

export default App;