import { useState } from "react";
import { Button } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import { ArrowDownward } from "@mui/icons-material";
import cn from "classnames";
import ProjectContainer from "./ProjectContainer";

function VerticalCarousel(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const halfwayIndex = Math.ceil(props.data.slides.length / 2);
  const itemHeight = 52;
  const shuffleThreshold = halfwayIndex * itemHeight;
  const visibleStyleThreshold = shuffleThreshold / 2;

  const handleClick = (direction) => {
    setActiveIndex((prevIndex) => {
      if (direction === 'next') {
        //if at the end of the carousel, then reset back to 0
        if (prevIndex + 1 > props.data.slides.length - 1) {
          return 0;
        }

        //otherwise, increment normally
        return prevIndex + 1;
      } else if (direction === 'prev') {
        //if on the first slide and go backwards, go to the last slide
        if (prevIndex - 1 < 0) {
          return props.data.slides.length - 1;
        }

        //otherwise decrement normally
        return prevIndex - 1;
      }
    });
  };

  const determinePlacement = (itemIndex) => {
    console.log('INDEX:' + itemIndex);
    //position item in the center of carousel
    if (activeIndex === itemIndex) {

      return 0;
    }

    //Targeting items in the second part of the list
    if (itemIndex >= halfwayIndex) {
      //If moving backwards from index 0 to the last item, move the value downwards
      if (activeIndex > (itemIndex - halfwayIndex)) {
        console.log('1');
        console.log('ret');
        console.log((itemIndex - activeIndex) * itemHeight);
        console.log('thresh');
        console.log(visibleStyleThreshold);
        return (itemIndex - activeIndex) * itemHeight;
      } else {
        //Negative value moves upward towards the top of the list
        console.log('2');
        console.log('ret');
        console.log(-((props.data.slides.length + activeIndex) - itemIndex) * itemHeight);
        console.log('thresh');
        console.log(visibleStyleThreshold);
        return -((props.data.slides.length + activeIndex) - itemIndex) * itemHeight;
      }
    }

    //Spacing for items after the current index
    if (itemIndex > activeIndex) {
      console.log('3');
      console.log('ret');
      console.log((itemIndex - activeIndex) * itemHeight);
      console.log('thresh');
      console.log(visibleStyleThreshold);
      return (itemIndex - activeIndex) * itemHeight;
    }

    //Spacing for items before the current index
    if (itemIndex < activeIndex) {
      if((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
        console.log('4');
        console.log('ret');
        console.log((props.data.slides.length - (activeIndex - itemIndex)) * itemHeight);
        console.log('thresh');
        console.log(visibleStyleThreshold);
        return (props.data.slides.length - (activeIndex - itemIndex)) * itemHeight;
      }
      console.log('5');
      console.log('ret');
      console.log(-(activeIndex - itemIndex) * itemHeight);
      console.log('thresh');
      console.log(visibleStyleThreshold);
      return -(activeIndex - itemIndex) * itemHeight;
    }
  };

  return (
    <section className="outer-container">
      <div className="carousel-wrapper">
        <Button className="carousel-button prev" onClick={() => handleClick('prev')}>
          <ArrowUpward />
        </Button>

        <div className="vertical-carousel">
          {/* <div className="leading-text">
            <p>text</p>
          </div> */}
          <div className="slides">
            <div className="carousel-inner">
              {/* Add the projectContainer component here to dynamically create it */}
              {props.data.slides.map((item, i) => (
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={cn('vertical-carousel-item', {
                    active: activeIndex === i,
                    visible: Math.abs(determinePlacement(i)) <= visibleStyleThreshold,
                  })}
                  key={item.id}
                  style = {{transform: `translateY(${determinePlacement(i)}px)`}}
                >
                  {/* <ProjectContainer project_name='test1'/>
                  <ProjectContainer project_name='test2'/>
                  <ProjectContainer project_name='test3'/>
                  <ProjectContainer project_name='test4'/> */}
                  {/* <ProjectContainer project_name={item.id} /> */}
                  {item.data.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button className="carousel-button next" onClick={() => handleClick('next')}>
          <ArrowDownward />
        </Button>
      </div>

      {/* <div className="content">
        <p>text</p>
      </div> */}
    </section>
  );
}

export default VerticalCarousel;