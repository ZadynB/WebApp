import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Close } from '@mui/icons-material';
import { Image } from 'react-bootstrap';

const offWhite = getComputedStyle(document.body).getPropertyValue('--off-white');
const dark = getComputedStyle(document.body).getPropertyValue('--dark');
const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');
const images = require.context('../images', true);

const Title = styled(Paper)(({ theme }) => ({
  backgroundColor: dark,
  padding: theme.spacing(1),
  marginLeft: theme.spacing(1),
  textAlign: 'left',
  color: 'white',
  boxShadow: '0px 0px 0px 0px'
}));

const Header = styled(Paper)(({ theme }) => ({
  backgroundColor: dark,
  padding: theme.spacing(1),
  marginRight: theme.spacing(3),
  textAlign: 'left',
  color: 'white',
  boxShadow: '0px 0px 0px 0px'
}));

const Description = styled(Paper)(({ theme}) => ({
  backgroundColor: dark,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  textAlign: 'justify',
  color: offWhite,
  boxShadow: '0px 0px 0px 0px',
  opacity: 0.75
}));

const Tool = styled(Paper)(({ theme }) => ({
  backgroundColor: blue2,
  marginLeft: theme.spacing(2),
  textAlign: 'center',
  color: 'white',
  width: '100%',
  height: '100%',
  boxShadow: '0px 0px 0px 0px'
}));

function ProjectContainer(props) {
 
  const [open, setOpen] = React.useState(false);
  const [zoom, setZoom] = React.useState(false);
  const tools = props.content.tools.split(', ');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleZoomIn = () => setZoom(true);
  const handleZoomOut = () => setZoom(false);

  const createTool = (item) => {
    return (
      <Grid item key={item}>
        <Tool className='project-item'>{item}</Tool>
      </Grid>
    );
  };

  const createClickableImage = () => {
    if (props.content.hasImage) {
      return (
        <Image 
          src={images(`./${props.content.name}.jpg`)} 
          style={{width: '100%', height: 'auto', objectFit:'cover'}}
          onClick={handleZoomIn}
        />
      );
    }
    return;
  };

  const createImage = () => {
    if (props.content.hasImage) {
      return (
        <Image 
          src={images(`./${props.content.name}.jpg`)} 
        />
      );
    }
    return;
  };

  return (
    <div className='project-container'>
      <React.Fragment key={props.name}>
        <div className='project-info' onClick={handleOpen}>
          <Grid container columnSpacing={1}>
            <Grid item sm={12} md={7}>
              <Title className='project-title'>Title: {props.content.name}</Title>
            </Grid>
            <Grid item md={5}>
              <Header className='project-item'>Date: {props.content.date}</Header>
            </Grid>
            <Grid item md={12}>
              <Description className='project-item'>{props.content.description}</Description>
            </Grid>
            {tools.map((item) => createTool(item))}
          </Grid>
        </div>
      </React.Fragment>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='modal_box'>
          <Button style={{position:'absolute', right: 0, top: 0}} onClick={handleClose}>
            <Close />
          </Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.content.name},
          </Typography>
          <Typography id="modal-modal-date" variant="h6" component="h2">
            {props.content.date}
          </Typography>

          {createClickableImage()}

          <Typography id="modal-modal-description1" sx={{ mt: 2, textIndent: '5%'}} className='modal-text'>
            {props.content.paragraph_1}
          </Typography>
          <Typography id="modal-modal-description2" sx={{ mt: 2, textIndent: '5%'}} className='modal-text'>
            {props.content.paragraph_2}
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={zoom}
        onClose={handleZoomOut}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='modal_image_box'>
          {createImage()}
        </Box>
      </Modal>
    </div>
  );
}

export default ProjectContainer;