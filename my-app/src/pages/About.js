import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Sidebar';
import Divider from '@mui/material/Divider';
import StackedNavbar from '../StackedNavbar';

function About() {
  return (
    <div className='App-body'>
      <Sidebar />
      <div className='App-body-main'>
        <h1>About</h1>
        <Divider
          variant='middle'
          sx={{
            borderColor: 'white',
            width: '100%'
          }}
        >
        </Divider>
        <br></br>
        <div>
          <p style={{textWrap: 'wrap'}}>
          This page holds information about the developers of this React Web Application.
          Additionally, you can also find information on the different kinds of projects that were done.
          In order to navigate this page, You can either use the below navigation links or use the button at the side of the page.
          </p>
        </div>
        {/* <div id='dev_info'>
          <p>This is going to be some info about me!</p>
        </div>
        <div id='project_info'>
          <p>This is going to be some info about what I did!</p>
        </div> */}
        <StackedNavbar capacity='3' items='Developers, Projects, GitHub' />
        <br></br>
        <Divider
          variant='middle'
          sx={{
            borderColor: 'white',
            width: '100%'
          }}
        >
        </Divider>
      </div>
    </div>
  );
}

export default About;