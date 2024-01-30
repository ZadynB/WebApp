import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import StackedNavbar from '../StackedNavbar';
import { useState } from 'react';
import projects from '../files/projects.json';
import ProjectContainer from '../components/ProjectContainer';

function Projects() {
  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');
  const [section, setSection] = useState('project_1');

  const changeSection = (section) => {
    setSection(section);
  };

  //add currently selected section variable x
  //add callback function from StackedNavbar.js to change the section x
  //add currently selected section variable to the props of StackedNavbar.js  x
  //add code to create new project container so that it can be dynamically created

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
      {/* <div>
        <p style={{textWrap: 'wrap'}}>
          This page holds information about the developers of this React Web Application.
          Additionally, you can also find information on the different kinds of projects that were done.
        </p>
        <p style={{textWrap: 'wrap'}}>
          In order to navigate to the various pages, you an either use the below navigation links or use the button at the side of the page
          to display the options.
        </p>
      </div> */}
      <ProjectContainer />
      <StackedNavbar items={projects} subHeader='Projects' currentSection={section} changeSection={changeSection}/>
    </motion.div>
  );
}

export default Projects;