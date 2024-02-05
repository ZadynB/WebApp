import * as React from 'react';
// import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid } from '@mui/material';
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
import Paper from '@mui/material/Paper';

function ProjectContainer(props) {
  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');

  return (
    <div className='project-container'>
      <React.Fragment key={props.name}>
        <div className='project-info'>
          <Grid container>
            <Grid item sm={12} md={8}>
              <Paper>{props.name}</Paper>
            </Grid>
            <Grid item sm={0} md={4}>
              <Paper>Date</Paper>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={12}>
              <Paper>Description</Paper>
            </Grid>
          </Grid>
          <Grid container>
            {/* add code to render a grid item for each tool used */}
            {/* to adjust the height of the paper add a height css parameter */}
            <Grid item >
              <Paper>CSS</Paper>
            </Grid>
          </Grid>
          {/* <div className='project-header'>
            <p>{props.name}</p>
            <p>Date</p>
          </div>
          <div className='project-desc'>
            <p>some text</p>
          </div> */}
        </div>
      </React.Fragment>
    </div>
  );
}

export default ProjectContainer;