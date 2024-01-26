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

function Sidebar() {
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
    let section;
    let sect_top;
    switch (text) {
      case 'Developers':
        // scroll to developer section
        section = document.getElementById('dev_info');
        sect_top = section.offsetTop;
        console.log(sect_top);
        window.scrollTo({
          top: sect_top,
          behavior: 'smooth'
        });
        break;
      case 'GitHub':
        //open github link in new tab
        window.open('https://github.com/ZadynB/WebApp');
        break;
      case 'Projects':
        // scroll to projects section
        section = document.getElementById('project_info');
        sect_top = section.offsetTop;
        console.log(sect_top);
        window.scrollTo({
          top: sect_top,
          behavior: 'smooth'
        });
        break;
      default:
        break;
    }
  };

  const getIcon = (text) => {
    switch (text) {
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
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Developers', 'Projects', 'GitHub'].map((text) => (
          <ListItem key={text} disablePadding>
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
          <Button size='small' variant='outlined' onClick={toggleDrawer(anchor, true)} className='rotate'>
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
