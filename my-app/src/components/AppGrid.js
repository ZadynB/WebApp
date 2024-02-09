import React from "react";
import { useSpring, animated, useSpringRef, useTransition } from '@react-spring/web';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

function AppGrid(props) {
  const apps = props.apps;

  const createAppTile = (key, value) => {
    return (<p>{value.id}</p>);
  };

  return (
    <div>
      {Object.entries(apps).map(([key, value]) => createAppTile(key, value))}
    </div>
  );
};

export default AppGrid;