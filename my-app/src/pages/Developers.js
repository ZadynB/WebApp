import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Divider from '@mui/material/Divider';
import StackedNavbar from '../StackedNavbar';

function Developers() {
  return (
    <div className='App-body-main'>
      <h1>Developers</h1>
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
  );
}

export default Developers;