// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './Navigationbar';

function App() {
  return (
    <div className="App">
      <Navigationbar/>
      <body className='App-body'>
        <div> 
          <p>Welcome! This is my new website!</p>
        </div>
      </body>
    </div>
  );
}

export default App;
