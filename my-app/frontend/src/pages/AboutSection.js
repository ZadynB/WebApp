import 'bootstrap/dist/css/bootstrap.min.css';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';

function AboutSection() {
  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');

  return (
    <motion.div 
      className='body-main-center'
      initial= {{opacity: 0}}
      animate = {{opacity: 1}}
      transition={{duration: 0.5, ease: 'easeOut'}}
      exit={{opacity: 0}}
    >
      <h1>About</h1>
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
      <div>
        <p style={{textWrap: 'wrap'}}>
          This page holds information about the developers of this React Web Application.
          Additionally, you can also find information on the different kinds of projects that were done.
        </p>
        <p style={{textWrap: 'wrap'}}>
          In order to navigate to the various pages, you an either use the below navigation links or use the button at the side of the page
          to display the options.
        </p>
      </div>
      {/* <StackedNavbar capacity='3' items='Developers, Projects, GitHub' /> */}
      <br></br>
      <Divider
        variant='middle'
        sx={{
          borderColor: blue2,
          width: '100%',
          borderWidth: '1px'
        }}
      >
      </Divider>
    </motion.div>
  );
}

export default AboutSection;