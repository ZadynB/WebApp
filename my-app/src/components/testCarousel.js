import React from "react";
import styled from "@emotion/styled";
import Slide from "./testSlide";
// import PropTypes from "prop-types";
import { useState } from "react";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const NavigationButtons = styled.div`
  position: relative;
  display: flex;

  height: 60px;
  margin: 0 auto;
  width: 20%;
  margin-top: 1rem;
  justify-content: space-between;
  z-index: 1000;
`;

const NavBtn = styled.div`
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 3px;
  color: black;
`;

// function mod(a, b) {
//   return ((a % b) + b) % b;
// }

function TestVerticalCarousel(props) {
  const [state, setState] = useState({
    index: 0,
    goToSlide: null,
    prevPropsGoToSlide: 0,
    newSlide: false,
    direction: ''
  });
  // console.log(props);
  // console.log(state);
//   state = {
//     index: 0,
//     goToSlide: null,
//     prevPropsGoToSlide: 0,
//     newSlide: false
//   };

//   const componentDidMount = () => {
//     document.addEventListener("keydown", event => {
//       if (event.isComposing || event.keyCode === 229) {
//         return;
//       }
//       if (event.keyCode === 38) {
//         moveSlide(-1);
//       }
//       if (event.keyCode === 40) {
//         moveSlide(1);
//       }
//     });
//   };

//   static propTypes = {
//     slides: PropTypes.arrayOf(
//       PropTypes.shape({
//         key: PropTypes.any,
//         content: PropTypes.object
//       })
//     ).isRequired,
//     goToSlide: PropTypes.number,
//     showNavigation: PropTypes.bool,
//     offsetRadius: PropTypes.number,
//     animationConfig: PropTypes.object
//   };

//   static defaultProps = {
//     offsetRadius: 2,
//     animationConfig: { tension: 120, friction: 14 }
//   };
  const mod = (a, b) => {
    return ((a % b) + b) % b;
  };

  const modBySlidesLength = (index) => {
    return mod(index, props.slides.length);
  };

  const moveSlide = (direction) => {
    // getting the direction string based on the direction value
    let dir = '';
    if (direction === 1) {
      dir = 'up';
    } else {
      dir = 'down';
    }
    
    // setting the new state
    setState({
      index: modBySlidesLength(state.index + direction),
      goToSlide: null,
      prevPropsGoToSlide: state.prevPropsGoToSlide,
      newSlide: state.newSlide,
      direction: dir
    });
  };

  const clampOffsetRadius = (offsetRadius) => {
    // const slides = props.slides;
    const upperBound = Math.floor((props.slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }

    return offsetRadius;
  };

  const getPresentableSlides = () => {
    // const { slides } = props.slides;
    // const { index } = state.index;
    // let { offsetRadius } = props.offsetRadius;
    // let offset = props.offsetRadius;
    let offsetRadius = clampOffsetRadius(props.offsetRadius);
    const presentableSlides = new Array();

    for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
      presentableSlides.push(props.slides[modBySlidesLength(state.index + i)]);
    }

    return presentableSlides;
  }

//   render() {
//     const { animationConfig, offsetRadius, showNavigation } = this.props;

//     let navigationButtons = null;
//     if (showNavigation) {
//       navigationButtons = (
//         <NavigationButtons>
//           <NavBtn onClick={() => this.moveSlide(1)}>&#8593;</NavBtn>
//           <NavBtn onClick={() => this.moveSlide(-1)}>&#8595;</NavBtn>
//         </NavigationButtons>
//       );
//     }
  let navigationButtons = null;
  if (props.showNavigation) {
    navigationButtons = (
      <NavigationButtons>
        <NavBtn onClick={() => moveSlide(1)}>&#8593;</NavBtn>
        <NavBtn onClick={() => moveSlide(-1)}>&#8595;</NavBtn>
      </NavigationButtons>
    );
  }

    return (
      <React.Fragment>
        <Wrapper>
          {getPresentableSlides().map((slide, presentableIndex) => (
            <Slide
              key={slide.id}
              content={slide.content.name}
              moveSlide={moveSlide}
              offsetRadius={clampOffsetRadius(props.offsetRadius)}
              index={presentableIndex}
              animationConfig={props.animationConfig}
              direction={state.direction}
            />
          ))}
        </Wrapper>
        {navigationButtons}
      </React.Fragment>
    );
//   }
}

export default TestVerticalCarousel;