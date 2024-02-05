import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const offWhite = getComputedStyle(document.body).getPropertyValue('--off-white');
const dark = getComputedStyle(document.body).getPropertyValue('--dark');
const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');

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
  textAlign: 'left',
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
  const tools = props.content.tools.split(', ');

  const createTool = (item) => {
    return (
      <Grid item key={item}>
        <Tool className='project-item'>{item}</Tool>
      </Grid>
    );
  };

  return (
    <div className='project-container'>
      <React.Fragment key={props.name}>
        <div className='project-info'>
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
    </div>
  );
}

export default ProjectContainer;