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

  return (
    <div className='project-container'>
      <React.Fragment key={props.name}>
          <div className='project_info'>
            <p style={{margin: 0}}>{props.name}</p>
          </div>
        </React.Fragment>
    </div>
  );
}

export default ProjectContainer;