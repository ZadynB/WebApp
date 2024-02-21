import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence, motion } from 'framer-motion';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/joy';
import SearchBar from '../components/SearchBar';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function SVNTCOG () {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');
  const dark = getComputedStyle(document.body).getPropertyValue('--dark');

  const visible_headers = ['date', 'worshipLeader', 'numSongs'];
  const columns = [
    {'field': 'id', 'hide': true},
    {'field': 'date', 'headerName': 'Date'},
    {'field': 'worshipLeader', 'headerName': 'Worship Leader'},
    {'field': 'numSongs', 'headerName': 'No. of Songs'}
  ];
  const rows = [
    {'id': '1', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '2', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
  ];
  
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/songs')
      .then((response) => {
        console.log(response.data.data);
        setSongs(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <AnimatePresence mode='wait'>
      <motion.div 
        className='App-body'
        initial= {{opacity: 0}}
        animate = {{opacity: 1}}
        transition={{duration: 0.5, ease: 'easeOut'}}
        exit={{opacity: 0}}
      >
        <div className='body-main'>
          <br></br>
          <h2>SVNTCOG App</h2>
          <Divider
            variant='middle'
            sx={{
              borderColor: blue2,
              width: '100%',
              borderWidth: '1px'
            }}
          >
          </Divider>
          <br></br>
          {loading ? (<CircularProgress size='md' className='spinner'/>) :
            (
              <div style={{width: '100%'}}>
                <SearchBar options={songs}/>
                <br></br>
                
                {/* component to display the planned services */}
                <div>
                  <DataGrid
                    columns={columns}
                    rows={rows}
                    slots={{toolbar: GridToolbar}}
                    sx={{color: 'white', bgcolor: dark}}
                    hideFooterPagination
                    hideFooter
                  />
                </div>
                <br></br>
                <div>
                  <DataGrid
                    columns={columns}
                    rows={rows}
                    slots={{toolbar: GridToolbar}}
                    sx={{color: 'white', bgcolor: dark}}
                    hideFooterPagination
                    hideFooter
                  />
                </div>
              </div>
            )
          }
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SVNTCOG;