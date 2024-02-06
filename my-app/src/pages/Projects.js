import 'bootstrap/dist/css/bootstrap.min.css';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import StackedNavbar from '../components/StackedNavbar';
import projects from '../files/projects.json';
import projectsInfo from '../files/projectsInfo.json';
import ProjectContainer from '../components/ProjectContainer';
import Carousel from '../components/Carousel';

function Projects() {
  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');

  return (
    <motion.div 
      className='body-main'
      initial= {{opacity: 0}}
      animate = {{opacity: 1}}
      transition={{duration: 0.5, ease: 'easeOut'}}
      exit={{opacity: 0}}
    >
      <br></br>
      <h1>Projects</h1>
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
        <h3 style={{textWrap: 'wrap'}}>
        Explore the Projects!
        </h3>
      </div>
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
      <br></br>
      <div className='main-content'>
        <h4 style={{textDecoration: 'underline 1px'}}>Controls</h4>
        <p style={{textWrap: 'wrap'}}>
          Use the "up" and "down" buttons to select a project from the carousel below.
        </p>
        <div className='carousel-container'>
          <Carousel data={projectsInfo} componentType={ProjectContainer}/>
        </div>
        <br></br>
        <p style={{textWrap: 'wrap'}}>
          You can view more details by clicking the "icon" button or by clicking the project.
        </p>
      </div>
      
      <StackedNavbar items={projects} subHeader='Projects' changeSection={() => {}} clickable={false}/>
    </motion.div>
  );
}

export default Projects;