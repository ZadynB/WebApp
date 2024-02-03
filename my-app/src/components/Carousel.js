import React from "react";
import { useSpring, animated, useSpringRef, useTransition, config } from '@react-spring/web';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

function Carousel(props) {
  const data = props.data.slides;
  const [activeState, setActiveState] = useState({index: 0, direction: ''});
  const [isHovered, setIsHovered] = useState(false);
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
      friction: 14,
      tension: 120
    }
  });

  // change background color
  const springRef = useSpringRef();
  const spring = useSpring({
    from: { opacity: 1, y: 0},
    to: [{ opacity: 1, y: -5}, { opacity: 1, y: 2}, { opacity: 1, y: 0}],
    ref: springRef,
    config: {
      duration: 1000,
      friction: 14,
      tension: 120
    }
  });

  useEffect(() => {
    transRef.start();
  }, [activeState]);

  useEffect(() => {
    springRef.start();
  }, [isHovered]);

  return (
    <div>
      <Button onClick={() => { handleClick('up');}}>
        <KeyboardArrowUp />
      </Button>
      <animated.div style={{...spring}} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {trans((style, index) => (
          <animated.div style={{...style, backgroundColor: 'white', zIndex: '1', position: 'relative'}}>
            <p style={{color: 'black', height: '100%', textAlign: 'center'}}>{index.content.name}</p>
          </animated.div>
        ))}
      </animated.div>
      <Button onClick={() => { handleClick('down');}}>
        <KeyboardArrowDown />
      </Button>
    </div>
  );
}

export default Carousel;