import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence, motion } from 'framer-motion';
import Divider from '@mui/material/Divider';

function Home() {
  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');
  
  
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
          <h1>Portfolio Web App</h1>
          <h5>Welcome to my portfolio!</h5>
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
          <h6>Here on the home page you will be able to see the web applications I have newly developed on this website.</h6>
          <h6>Please feel free to try them out!</h6>
          <h6>If you would like to know more about the developers, projects or you would like to contact them, navigate to the "About" section.</h6>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Home;