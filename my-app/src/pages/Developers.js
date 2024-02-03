// import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import { Image } from 'react-bootstrap';
import zadyn_pic from '../images/zadyn_pic.jpg';
// import StackedNavbar from '../StackedNavbar';

function Developers() {
  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');

  return (
    <motion.div 
      className='body-main'
      initial= {{opacity: 0}}
      animate = {{opacity: 1}}
      transition={{duration: 0.5, ease: 'easeOut'}}
      exit={{opacity: 0}}
    >
      <br></br>
      <h1>Developers</h1>
      <Divider
        variant='middle'
        sx={{
          borderColor: blue2,
          width: '100%',
          borderWidth: '1px'
        }}
      >
      </Divider>
      <br></br>
      <div>
        <h3 style={{textWrap: 'wrap'}}>
        Meet the developers!
        </h3>
      </div>
      <br></br>
      <Divider
        variant='middle'
        sx={{
          borderColor: blue2,
          width: '100%',
          borderWidth: '1px'
        }}
      >
      </Divider>
      <br></br>
      <section>
        <h4>Introductions</h4>
        <br></br>
        <figure className='figure'>
          <Image src={zadyn_pic} style={{height: '180px', width: '171px', marginRight: '10px'}} roundedCircle/>
          <figcaption className='caption'>Zadyn Belgrave</figcaption>
        </figure>
        <p style={{textAlign: 'left'}}>
          Hi! I am a keen young man who has a passion for software development! 
        </p>
        <p style={{textAlign: 'left'}}>
          As a young lad, I was fascinated with computers and fell in love with these machines.
          And so, I tinkered with every computer component my dad had lying around in the study room.
          However, as time progressed, I learned of the software side of computers. Being able to create games, dynamic
          applications, websites and so on made my eyes light up with aspiration.
        </p>
        <p style={{textAlign: 'left'}}>
          Those dreams have led me to pursue a
          career in software/web development. I graduated from the University of Guelph with a Bachelor of Computing degree with Distinction,
          majoring in the field of Computer Science (Co-op). The Co-op component of my degree has allowed me to gain invaluable experience
          in the working world, whether it be in technical skills or soft core skills. Now in my free time, I aim to create a personal web app
          to further my knowledge in web development.
        </p>
        <p style={{textAlign: 'left'}}>
          Other activities that pique my interest include volleyball, watching anime, drawing, listening to music and gaming.
        </p>
      </section>
    </motion.div>
  );
}

export default Developers;