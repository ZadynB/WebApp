import React from "react";
import { useSpring, animated, useSpringRef, useTransition, config } from '@react-spring/web';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import Info from '@mui/icons-material/Info';

function Carousel(props) {
  const data = props.data.slides;
  const [activeState, setActiveState] = useState({index: 0, direction: ''});
  const [isHovered, setIsHovered] = useState({item: false, info: false});
  const presentableData = data[activeState.index];
  const lightBlue = getComputedStyle(document.body).getPropertyValue('--light-blue2');

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
    from: isHovered.item ? { opacity: 1, scale: 1} : { opacity: 1, scale: 1.2},
    to: isHovered.item ? { opacity: 1, scale: 1.2} : { opacity: 1, scale: 1},
    ref: itemSpringRef,
    config: {
      friction: 10,
      tension: 120
    }
  });

  const infoSpringRef = useSpringRef();
  const infoSpring = useSpring({
    from: isHovered.info ? { opacity: 1, scale: 1, backgroundColor: 'white'} : { opacity: 1, scale: 1.2, backgroundColor: lightBlue},
    to: isHovered.info ? { opacity: 1, scale: 1.2, backgroundColor: lightBlue} : { opacity: 1, scale: 1, backgroundColor: 'white'},
    ref: infoSpringRef,
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
  }, [isHovered.item, itemSpringRef]);

  useEffect(() => {
    infoSpringRef.start();
  }, [isHovered.info, infoSpringRef]);

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
        onMouseEnter={() => setIsHovered({item: true, info: false})}
        onMouseLeave={() => setIsHovered({item: false, info: false})}
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
      <animated.div
        style={{...infoSpring, margin: 'auto', borderRadius: '5px'}}
        onMouseEnter={() => setIsHovered({item: false, info: true})}
        onMouseLeave={() => setIsHovered({item: false, info: false})}
      >
        <Button size='small' className='project-info-btn'>
          <Info />
        </Button>
      </animated.div>
    </div>
  );
}

export default Carousel;