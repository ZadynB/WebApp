import React from "react";
import { useSpring, animated, useSpringRef, useTransition } from '@react-spring/web';
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
    leave: { opacity: 0, y: activeState.direction === 'up' ? -15: 15 },
    ref: transRef,
    exitBeforeEnter: true,
    config: {
      duration: 350,
    }
  });

  // change scale of slide
  const itemSpringRef = useSpringRef();
  const itemSpring = useSpring({
    from: isHovered? { opacity: 1, scale: 1} : { opacity: 1, scale: 1.2},
    to: isHovered ? { opacity: 1, scale: 1.2} : { opacity: 1, scale: 1},
    ref: itemSpringRef,
    config: {
      friction: 10,
      tension: 120
    }
  });

  useEffect(() => {
    transRef.start();
  }, [activeState, transRef]);

  useEffect(() => {
    itemSpringRef.start();
  }, [isHovered, itemSpringRef]);

  const createComponent = (index) => {
    let properties = {'content': index.content};
    const newComp = React.createElement(props.componentType, properties);
    return(newComp);
  }

  return (
    <div className='slide-container'>
      <Button style={{margin: 'auto'}} size='small' onClick={() => handleClick('up')}>
        <KeyboardArrowUp />
      </Button>
      <animated.div 
        style={{...itemSpring, height: '100%', padding: '5px 5px', zIndex: 5, cursor: 'pointer'}}
        onClick={() => {}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {trans((style, index) => (
          <animated.div style={{...style, position: 'relative', height: '100%'}}>
            {createComponent(index)}
          </animated.div>
        ))}
      </animated.div>
      <Button style={{margin: 'auto'}} size='small' onClick={() => handleClick('down')}>
        <KeyboardArrowDown />
      </Button>
    </div>
  );
}

export default Carousel;