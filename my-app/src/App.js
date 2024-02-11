import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/Navigationbar';

// importing pages
import About from './pages/About';
import Home from './pages/Home';
import Test from './pages/Test';

function App() {
  // Getting the page to display
  let component;

  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break;
    case "/about":
      component = <About />;
      break;
    case "/svntcog-app":
      component = <Test />;
      break;
    default:
      component = <Home />;
  }

  return (
    <div className="App">
      <Navigationbar/>
      {component}
    </div>
  );
}

export default App;
