import React from "react";
import { useSpring, animated, useSpringRef } from '@react-spring/web';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { InsertPhoto } from "@mui/icons-material";

const offWhite = getComputedStyle(document.body).getPropertyValue('--off-white');

const Tile = styled(Button)(({ theme }) => ({
  backgroundColor: offWhite,
  padding: theme.spacing(1),
  height: '100px',
  width: '100%',
  textAlign: 'center',
  color: 'white',
  boxShadow: '0px 0px 0px 0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}));

function AppTile(props) {
  const details = props.details;
  const [isHovered, setHovered] = useState(false);

  const handleClick = () => {
    window.location.pathname = details.link;
  };

  // spring
  const springRef = useSpringRef();
  const spring = useSpring({
    from: isHovered ? { opacity: 1, scale: 1} : { opacity: 1, scale: 1.2},
    to: isHovered ? { opacity: 1, scale: 1.2} : { opacity: 1, scale: 1},
    ref: springRef,
    config: {
      friction: 10,
      tension: 120
    }
  });

  useEffect(() => {
    springRef.start();
  }, [isHovered, springRef]);

  return (
      <animated.div
        style={{...spring}}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {details.name}
        <Tile onClick={handleClick} className="app-tile">
          <InsertPhoto sx={{color:'black'}}/>
        </Tile>
      </animated.div>
  );
};

export default AppTile;