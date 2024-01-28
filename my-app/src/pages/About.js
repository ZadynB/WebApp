import '../App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Sidebar';
import AboutSection from './AboutSection';
import Developers from './Developers';

function About() {
  const sectionObj = {
    About: <AboutSection />,
    Developers: <Developers />
  };
  const [section, setComponent] = useState({component: <AboutSection />});
  

  const setSection = (section) => {
    setComponent({component: sectionObj[section]});
  }

  

  return (
    <div id='about-pg' className='App-body'>
      <Sidebar items='Developers, Projects, GitHub' changeSection={setSection}/>
      {section.component}
    </div>
  );
}

export default About;