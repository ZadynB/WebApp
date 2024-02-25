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
  const [loading, setLoading] = useState(false);

  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');

  const serviceColumns = [
    { field: 'date', headerName: 'Date', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'worshipLeader', headerName: 'Worship Leader', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'numSongs', headerName: 'No. of Songs', flex: 1, headerAlign: 'center', align: 'center'}
  ];

  const songsColumns = [
    { field: 'name', headerName: 'Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'songWriter', headerName: 'Author', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'key', headerName: 'Key', flex: 1, headerAlign: 'center', align: 'center'}
  ];

  const songsRows = [
    {'id': '1', 'name': 'Hide Me Now', 'songWriter': 'Hillsong', 'key': 'C'},
    {'id': '2', 'name': 'Create a Clean Heart', 'songWriter': 'Dionne', 'key': 'C#'},
  ];

  const serviceRows = [
    {'id': '1', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '2', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '3', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '4', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '5', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '6', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '7', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '8', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '9', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '10', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '11', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '12', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '13', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '14', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '15', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '16', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '17', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '18', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '19', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '20', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '21', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '22', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '23', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '24', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '25', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '26', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '27', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '28', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '29', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '30', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '31', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '32', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '33', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '34', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '35', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '36', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '37', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '38', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '39', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '40', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '41', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '42', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '43', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '44', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '45', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '46', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
    {'id': '47', 'date': '02/20/2024', 'worshipLeader': 'Dionne', 'numSongs': '3'},
    {'id': '48', 'date': '02/25/2024', 'worshipLeader': 'Zadyn', 'numSongs': '4'},
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
        <div className='svntcog-main'>
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
                <Stack spacing={1} alignItems='center' direction='column'>
                  {/* component to display the planned services */}
                  <CustomDataGrid columns={serviceColumns} rows={serviceRows}/>
                  <ButtonGroup variant='solid' spacing='0.5rem'>
                    <Button size='sm'>Add</Button>
                    <Button size='sm'>Edit</Button>
                    <Button size='sm'>Delete</Button>
                  </ButtonGroup>

                  {/* component to display the planned services */}
                  <CustomDataGrid columns={songsColumns} rows={songsRows}/>
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