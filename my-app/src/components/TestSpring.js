import React from "react";
import styled from "@emotion/styled";
import { Spring } from "react-spring";
import { withGesture } from "react-with-gesture";
// import useSpring
import { useSpring, animated, useSpringRef, useTransition, config } from '@react-spring/web';
import { useState, useEffect } from "react";
import { transform } from "framer-motion";
import { Button } from "@mui/material";
import projectsInfo from '../files/projectsInfo.json';

function TestSpring(props) {
  const data = props.data.slides;
  const [activeState, setActiveState] = useState({index: 0, direction: ''});
  const presentableData = data[activeState.index];

  const handleClick = (dir) => {
    if (dir === 'up') {
      setActiveState({index: (activeState.index + 1) % data.length, direction: dir});
    } else {
      setActiveState({index: (activeState.index + (data.length - 1)) % data.length, direction: dir});
    }
  };

  const transRef = useSpringRef();

  const trans = useTransition( presentableData, {
    from: { opacity: 0, y: activeState.direction === 'up' ? 10 : -10 },
    enter: [{ opacity: 1, y: activeState.direction === 'up' ? -5 : 5 }, { opacity: 1, y: 0}],
    leave: { opacity: 0, y: activeState.direction === 'up' ? -10: 10 },
    ref: transRef,
    exitBeforeEnter: true,
    config: {
      duration: 250,
    }
  });

  useEffect(() => {
    transRef.start();
  }, [activeState]);

  return (
    <div style={{height: '400px', width: '400px'}}>
      {trans((style, index) => (
        <animated.div style={{...style, backgroundColor: 'white', zIndex: '1', position: 'relative'}}>
          <p style={{color: 'black', height: '100%', textAlign: 'center'}}>{index.content.name}</p>
        </animated.div>
      ))}
      <Button onClick={() => handleClick('up')}> next </Button>
      <Button onClick={() => handleClick('down')}> prev </Button>
    </div>
  );
}

export default TestSpring;