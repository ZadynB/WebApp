import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Sidebar';
import Divider from '@mui/material/Divider';

function About() {
  return (
    <div className='App-body'>
      <Sidebar />
      <div className='App-body-main scroll-wrapper'>
        <h1>About Us</h1>
        <Divider
          variant='middle'
          sx={{
            borderColor: 'white',
          }}
        >
        </Divider>
        <div id='dev_info'>
          <p>This is going to be some info about me!</p>
        </div>
        <div id='project_info'>
          <p>This is going to be some info about what I did!</p>
        </div>
      </div>
    </div>
  );
}

export default About;