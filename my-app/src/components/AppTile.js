import React from "react";
import { useSpring, animated, useSpringRef, useTransition } from '@react-spring/web';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { InsertPhoto } from "@mui/icons-material";

const offWhite = getComputedStyle(document.body).getPropertyValue('--off-white');
const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');

const Tile = styled(Button)(({ theme }) => ({
  backgroundColor: offWhite,
  padding: theme.spacing(1),
  height: '100px',
  width: '100%',
  textAlign: 'center',
  color: 'white',
  boxShadow: '0px 0px 0px 0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}));

function AppTile(props) {
  const details = props.details;

  const handleClick = () => {
    console.log(window.location);
    window.location.pathname = details.link;
  };

  // add styling like srping

  return (
    <Grid item xs={6} md={2}>
      {details.name}
      <Tile onClick={handleClick}>
        <InsertPhoto sx={{color:'black'}}/>
      </Tile>
    </Grid>
  );
};

export default AppTile;