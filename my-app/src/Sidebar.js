import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Info from '@mui/icons-material/Info';
import GitHub from '@mui/icons-material/GitHub';
import CollectionsBookmark from '@mui/icons-material/CollectionsBookmark';
// import AboutSection from './pages/AboutSection';

function Sidebar(props) {
  const items = props.items.split(', ');

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const sidebarAction = (text) => (event) => {
    switch (text) {
      case 'About':
        // change section to About section
        props.changeSection(text);
        break;
      case 'Developers':
        // change section to Developers section
        props.changeSection(text);
        break;
      case 'GitHub':
        //open github link in new tab
        window.open('https://github.com/ZadynB/WebApp');
        break;
      case 'Projects':
        //change section to Projects section
        props.changeSection(text);
        break;
      default:
        break;
    }
  };

  const getIcon = (text) => {
    switch (text) {
      case 'About':
        return (<Info />)
      case 'Developers':
        return (<Info />);
      case 'GitHub':
        return (<GitHub />);
      case 'Projects':
        return (<CollectionsBookmark />);
      default:
        return (<Info />);
    }
  }

  const list = (anchor) => (
    <Box
      sx={{ width: 250}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {items.map((text) => (
          <ListItem key={text} disablePadding disabled={props.currentSection === text ? true : false} className='sidebar-item'>
            <ListItemButton onClick={sidebarAction(text)}>
              <ListItemIcon>
                {getIcon(text)}
              </ListItemIcon>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className='sidebar'>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button size='small' variant='outlined' onClick={toggleDrawer(anchor, true)} className='rotate sidebar-btn'>
              <KeyboardArrowUp/>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Sidebar;
