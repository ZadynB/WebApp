import React from "react";
import { animated, useSpringRef, useTransition } from '@react-spring/web';
import { useEffect } from "react";
import { Grid } from '@mui/material';
import AppTile from './AppTile';

function AppGrid(props) {
  const apps = props.apps;

  const createAppTile = (item) => {
    return (
      <AppTile key={item.id} details={item}/>
    );
  };

  //transition
  const transRef = useSpringRef();
  const trans = useTransition(apps, {
    ref: transRef,
    trail: 400 / apps.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
    config: {
      friction: 10,
      tension: 120
    }
  });

  useEffect(() => {
    transRef.start();
  }, [apps, transRef]);

  return (
    <Grid container justifyContent='center' columnSpacing={1} rowSpacing={1}>
        {trans((style, item) => (
          <Grid item xs={6} md={2} className="app-grid-tile">
            <animated.div style={{...style}}>
              {createAppTile(item)}
            </animated.div>
          </Grid>
        ))}
    </Grid>
  );
};

export default AppGrid;