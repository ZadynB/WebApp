import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence, motion } from 'framer-motion';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/joy';
import SearchBar from '../components/SearchBar';

function SVNTCOG () {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');
  
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
              <div className='svntcog-main'>
                <SearchBar options={songs}/>
              </div>
            )
          }
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SVNTCOG;