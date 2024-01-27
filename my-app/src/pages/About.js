import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Sidebar';
import AboutSection from './AboutSection';
import Developers from './Developers';
// import Home from './Home';
// import Divider from '@mui/material/Divider';
// import StackedNavbar from '../StackedNavbar';

function About() {
  let currentSection = 'About';
  // let component1;

  const changeComponent = () => {
    switch (currentSection) {
      case 'About':
        return(<AboutSection />);
        // break;
      case 'Developers':
        console.log('HERE');
        return(<Developers />);
        // break;
      default:
        return(<AboutSection />);
    }
  }

  

  // changeComponent();
  

  const setSection = (section) => {
    // section = section.toLowerCase();
    console.log(section);
    currentSection = section;
    changeComponent();

    // wind

    // switch (currentSection) {
    //   case 'About':
    //     component = <AboutSection />;
    //     break;
    //   case 'Developers':
    //     console.log('HERE');
    //     component = <Home />;
    //     break;
    //   default:
    //     component = <AboutSection />;
    // }
  }

  

  return (
    <div className='App-body'>
      <Sidebar items='Developers, Projects, GitHub' changeSection={setSection}/>
      {changeComponent()}
      {/* <div className='App-body-main'>
        <h1>About</h1>
        <Divider
          variant='middle'
          sx={{
            borderColor: 'white',
            width: '100%'
          }}
        >
        </Divider>
        <br></br>
        <div>
          <p style={{textWrap: 'wrap'}}>
          This page holds information about the developers of this React Web Application.
          Additionally, you can also find information on the different kinds of projects that were done.
          In order to navigate this page, You can either use the below navigation links or use the button at the side of the page.
          </p>
        </div>
        <StackedNavbar capacity='3' items='Developers, Projects, GitHub' />
        <br></br>
        <Divider
          variant='middle'
          sx={{
            borderColor: 'white',
            width: '100%'
          }}
        >
        </Divider>
      </div> */}
    </div>
  );
}

export default About;