import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';

function Sidebar() {

  return (
    <div className='App-body-item App-body-sidebar'>
      <div className='Sidebar'>
        <div className='Sidebar-txt'>
          <p>Some Text</p>
        </div>
        <Button color='primary' variant='contained' className='Sidebar-btn'>
          <ArrowForwardIos/>
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;