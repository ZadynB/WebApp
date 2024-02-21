import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence, motion } from 'framer-motion';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import axios from 'axios';

function SVNTCOG () {
  const [songs, setSongs] = useState([]);
  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');
  
  useEffect(() => {
    axios
      .get('http://localhost:5555/songs')
      .then((response) => {
        console.log(response.data.data);
        setSongs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
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
          {/* <p>{songs[0].title}</p> */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SVNTCOG;