import React from "react";
import { useSpring, animated, useSpringRef, useTransition } from '@react-spring/web';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import AppTile from './AppTile';

function AppGrid(props) {
  const apps = props.apps;

  const createAppTile = (key, value) => {
    return (<AppTile key={key} details={value}/>);
  };

  //add styling like the spring/transition for all of the grid items
  return (
    <Grid container justifyContent='center' columnSpacing={1} rowSpacing={1}>
      {Object.entries(apps).map(([key, value]) => createAppTile(key, value))}
    </Grid>
  );
};

export default AppGrid;