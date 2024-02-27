import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence, motion } from 'framer-motion';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Button, ButtonGroup, Stack } from '@mui/joy';
import SearchBar from '../components/SearchBar';
import CustomDataGrid from '../components/CustomDataGrid';

function SVNTCOG () {
  const [songs, setSongs] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceSongs, setServiceSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');

  const serviceColumns = [
    { field: 'date', headerName: 'Date', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'worshipLeader', headerName: 'Worship Leader', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'numSongs', headerName: 'No. of Songs', flex: 1, headerAlign: 'center', align: 'center'}
  ];

  const songsColumns = [
    { field: 'song', headerName: 'Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'singer', headerName: 'Singer', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'author', headerName: 'Author', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'key', headerName: 'Key', flex: 1, headerAlign: 'center', align: 'center'}
  ];

  useEffect(() => {
    setLoading(true);

    try {
      // call to route to get songs
      axios
        .get('http://localhost:5555/songs')
        .then((response) => {
          setSongs(response.data.data);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });

      // call to route to get services
      axios
        .get('http://localhost:5555/services')
        .then((response) => {
          setServices(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
      });
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
    
  }, []);

  const displayServiceSongs = (rowParams) => {
    // call to route to get the service songs
    try {
      axios
        .get('http://localhost:5555/serviceSongs/byParentId', {
          params: {
            parentId: rowParams.row.id
          }
        })
        .then((response) => {
          setServiceSongs(response.data.data);
        })
        .catch((error) => {
          console.log(error.message);
        })
    } catch (error) {
      console.log(error.message);
    }
    
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div 
        className='App-body'
        initial= {{opacity: 0}}
        animate = {{opacity: 1}}
        transition={{duration: 0.5, ease: 'easeOut'}}
        exit={{opacity: 0}}
      >
        <div className='svntcog-main'>
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
                <Stack spacing={1} alignItems='center' direction='column'>
                  {/* component to display the planned services */}
                  <CustomDataGrid columns={serviceColumns} rows={services} isServiceTable={true} displayServiceSongs={displayServiceSongs}/>
                  <ButtonGroup variant='solid' spacing='0.5rem'>
                    <Button size='sm'>Add</Button>
                    <Button size='sm'>Edit</Button>
                    <Button size='sm'>Delete</Button>
                  </ButtonGroup>

                  {/* component to display the planned services */}
                  <CustomDataGrid columns={songsColumns} rows={serviceSongs} isServiceTable={false}/>
                  <ButtonGroup variant='solid' spacing='0.5rem'>
                    <Button size='sm'>Add</Button>
                    <Button size='sm'>Edit</Button>
                    <Button size='sm'>Delete</Button>
                  </ButtonGroup>
                </Stack>
              </div>
            )
          }
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SVNTCOG;