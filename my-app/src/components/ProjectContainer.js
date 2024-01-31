import * as React from 'react';
// import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import StackedNavbar from './StackedNavbar';
import { useState } from 'react';
import projects from '../files/projects.json';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Info from '@mui/icons-material/Info';

function ProjectContainer(props) {
  // const [state, setState] = useState({
  //   bottom: false,
  // });

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }

  //   setState({ ...state, [anchor]: open });
  // };
//   const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');
//   const [section, setSection] = useState('project_1');

//   const changeSection = (section) => {
//     setSection(section);
//   };

  //add currently selected section variable x
  //add callback function from StackedNavbar.js to change the section x
  //add currently selected section variable to the props of StackedNavbar.js  x
  //add code to create new project container so that it can be dynamically created

  // const list = (anchor) => (
  //   <Box
  //     sx={{ width: '100%'}}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     {/* <List>
  //       {items.map((text) => (
  //         <ListItem key={text} disablePadding disabled={props.currentSection === text ? true : false} className='sidebar-item'>
  //           <ListItemButton onClick={sidebarAction(text)}>
  //             <ListItemIcon>
  //               {getIcon(text)}
  //             </ListItemIcon>
  //             <ListItemText primary={text}/>
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List> */}
  //   </Box>
  // );

  return (
    <div className='project-container'>
      {/* {['bottom'].map((anchor) => (
        
      ))} */}
      <React.Fragment key={props.project_name}>
          <div className='project_info'>
            <p>{props.project_name}</p>
          </div>
          {/* <Button size='small' className='project-container-btn'>
            <Info />
          </Button> */}
          {/* <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer> */}
        </React.Fragment>
    </div>
  );
}

export default ProjectContainer;