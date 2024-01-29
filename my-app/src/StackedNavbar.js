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
  const items = props.items.split(', ');

  const createListItem = (item) => {
    return(
      <ListItem key={item} disablePadding>
        <ListItemButton>
          <ListItemText className='stackedNavbar-item' primary={item}/>
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <div className='stackedNavbar'>
      <Box
        sx={{ width: 150}}
        role="presentation"
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader sx={{background: 'rgba(0, 0, 0, 0)', color: offWhite, textAlign: 'left'}} component="div" id="nested-list-subheader">
              Projects
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
          {items.map((text) => createListItem(text))}
        </List>
      </Box>
    </div>
  );
}

export default StackedNavbar;