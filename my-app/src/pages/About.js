import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Sidebar';

function About() {

  return (
    <div className='App-body'>
      <Sidebar/>
      <div className='App-body-item App-body-main'>
        <h1>About Us</h1>
      </div>
    </div>
  );
}

export default About;