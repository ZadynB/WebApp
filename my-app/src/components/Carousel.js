import React from "react";
import { useSpring, animated, useSpringRef, useTransition, config } from '@react-spring/web';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import ProjectContainer from "./ProjectContainer";

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
    }
  });

  // change background color
  const springRef = useSpringRef();
  const spring = useSpring({
    from: { opacity: 1, scale: 1},
    to: [{ opacity: 1, scale: 1.2}, { opacity: 1, y: 0, scale: 1}],
    ref: springRef,
    config: {
      friction: 10,
      tension: 120
    }
  });

  useEffect(() => {
    transRef.start();
  }, [activeState, transRef]);

  useEffect(() => {
    springRef.start();
  }, [isHovered, springRef]);

  const createComponent = (index) => {
    let properties = {'name': index.content.name};
    const newComp = React.createElement(props.componentType, properties);
    return(newComp);
  }

  return (
    <div>
      <Button onClick={() => { handleClick('up');}}>
        <KeyboardArrowUp />
      </Button>
      <animated.div style={{...spring}} onMouseEnter={() => setIsHovered(!isHovered)}>
        {trans((style, index) => (
          <animated.div style={{...style, position: 'relative'}}>
            {createComponent(index)}
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