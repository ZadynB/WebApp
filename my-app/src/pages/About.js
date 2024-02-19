import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Sidebar';
import AboutSection from './AboutSection';
import Developers from './Developers';
import Projects from './Projects';
import { AnimatePresence } from 'framer-motion';

function About() {
  const sectionObj = {
    About: <AboutSection key={'About'}/>,
    Developers: <Developers key={'Developers'}/>,
    Projects: <Projects key={'Projects'}/>
  };
  
  const [section, setComponent] = useState({
    currentSection: 'About',
    component: <AboutSection key={'About'}/>
  });
  

  const setSection = (section) => {
    setComponent({
      currentSection: section,
      component: sectionObj[section]
    });
  };
  

  return (
    <div id='about-pg' className='App-body'>
      <Sidebar currentSection={section.currentSection} items='About, Developers, Projects, GitHub' changeSection={setSection}/>
      <AnimatePresence mode='wait'>
        {section.component}
      </AnimatePresence>
      
    </div>
  );
}

export default About;