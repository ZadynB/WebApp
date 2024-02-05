import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';


function StackedNavbar(props) {
  const offWhite = getComputedStyle(document.body).getPropertyValue('--off-white');
  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');
  const orange = getComputedStyle(document.body).getPropertyValue('--orange');
  const items = props.items;
  const subHeader = props.subHeader;

  const createListItem = (key, value) => {
    if (props.clickable) {
      return(
        <ListItem key={key} disablePadding>
          <ListItemButton
            className='highlight-text'
            disabled={props.currentSection === key ? true : false}
            onClick={() => props.changeSection(key, value)}
          >
            <ListItemText className='stackedNavbar-btn' primary={value} />
          </ListItemButton>
        </ListItem>
      );
    } else {
      return(
        <ListItem key={key} disablePadding>
          <ListItemText className='stackedNavbar-item highlight-text' style={{cursor: 'default'}} primary={value} />
        </ListItem>
      );
    }
    
  }

  return (
    <div className='stackedNavbar'>
      <Box
        sx={{ width: '100%'}}
        role="presentation"
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader sx={{background: 'rgba(0, 0, 0, 0)', color: offWhite, textAlign: 'left'}} component="div" id="nested-list-subheader">
              {subHeader}
              <Divider
                variant='left'
                sx={{
                  borderColor: blue2,
                  width: '60%',
                  borderWidth: '1px'
                }}
              >
              </Divider>
            </ListSubheader>
          }
        >
          {Object.entries(items).map(([key, value]) => createListItem(key, value))}
        </List>
      </Box>
    </div>
  );
}

export default StackedNavbar;