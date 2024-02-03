import React from "react";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { Spring } from "react-spring";
import { withGesture } from "react-with-gesture";
// import useSpring
import { useSpring, animated, useTransition, useSpringRef } from '@react-spring/web';
import { transform } from "framer-motion";

const SlideContainer = styled.div`
  position: absolute;
  height: 70%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
`;

const SlideCard = styled.div`
  position: relative;
  max-width: 50%;
  min-width: 30%;
  width: 100vw;
  height: 100%;
  background: white;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
  color: black;
`;

// {
//     content,
//     offsetRadius,
//     index,
//     animationConfig,
//     moveSlide,
//     delta,
//     down,
//     up
//   }

function TestSlide(props) {
  console.log(props);
  // console.log("NAME:" + content);
  // console.log('Offset:' +offsetRadius);
  // console.log('INDEX:' + index);
  const offsetFromMiddle = props.index - props.offsetRadius;
  // console.log('OffMid:' + offsetFromMiddle);
  const totalPresentables = 2 * props.offsetRadius + 1;
  // console.log('Pres:' + totalPresentables);
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / (props.offsetRadius + 1));
  // console.log('DIST:' + distanceFactor);
  // console.log('Down:' + down);
  // console.log('UP:' + up);
  // console.log("DELT:" + delta);
  const offsetCardClick = i => {
    console.log(i);
  };

  const translateYoffset = 50 * (Math.abs(offsetFromMiddle) / (props.offsetRadius + 1));
  let translateY = -50;

  if (props.offsetRadius !== 0) {
    if (props.index === 0) {
      translateY = 0;
    } else if (props.index === totalPresentables - 1) {
      translateY = -100;
    }
  }
  // console.log('Trans:' + translateY);

  if (offsetFromMiddle === 0) {
    // translateY += delta[1] / (props.offsetRadius + 1);
    // console.log("NEW TRANS:" + translateY);
    if (translateY > -40) {
      // console.log('here');
      props.moveSlide(-1);
    }
    if (translateY < -100) {
      // console.log('here2');
      console.log('here');
      props.moveSlide(1);
    }
  }

  if (offsetFromMiddle > 0) {
    translateY += translateYoffset;
  } else if (offsetFromMiddle < 0) {
    translateY -= translateYoffset;
  }
  console.log('CONTENT:' + props.content);
  console.log('TRANS:' + translateY);
  console.log("INDEX:" + props.index);
  // console.log("NEW TRANS2:" + translateY);

  // let str = '';
  // console.log(props.direction);
  // if (props.direction === 'up') {
  //   if (props.index === 2) {
  //     str = `translateX(0%) translateY(1%) scale(${0})`;
  //   } else if (props.index === 1){
  //     str = `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`;
  //   } else {
  //     str = `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`;
  //   }
  // } else {
  //   if (props.index === 2) {
  //     str = `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`;
  //   } else {
  //     str = `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`;
  //   }
  // }
  
  // transition for carousel
//   const string = useSpring({
//     from: {opacity: 0, y: 0},
//     to: [
//      { opacity: 0.25, y: -20},
//      { opacity: 0, y: 10},
//      { opacity: 1, y: -5},
//      { opacity: 1, y: 0}
//     ],
//     config: {duration: 150, friction: 14, tension: 120},
//     //ref: transRef
//  });
  const transRef = useSpringRef();
  const data = [props.content];
  const transitions = useTransition( data, {
    from: {
      opacity: 1, y: 10
    },
    enter: [
      {opacity: 1, y: 0}
    ],
    leave: {
      opacity: 0, y: -10
    },
    ref: transRef,
    trail: 400,
    config: props.animationConfig
  });

  // useEffect(() => {
  //   transRef.start();
  // });

  return (
    <div style={{height: '400px', width: '400px'}}>
      {transitions((style, item) => (
        <animated.div style={{...style, backgroundColor: 'white', zIndex: '1', position: 'relative'}}>
          <p style={{color: 'black', height: '100%', textAlign: 'center'}}>{item}</p>
        </animated.div>
      ))}
    </div>
    
    // <animated.div style={{...string}}>
    //   <p>{props.content}</p>
    //   {/* <SlideContainer
    //     style={{zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2)}}
    //   >
    //     <SlideCard onClick={() => moveSlide(offsetFromMiddle)}>
    //       {content}
    //     </SlideCard>
    //   </SlideContainer> */}
    // </animated.div>
  );
}

export default TestSlide;
