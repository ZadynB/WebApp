// import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TestSpring from '../components/TestSpring';
import projectsInfo from '../files/projectsInfo.json';

function Home() {

  return (
    <div className='App-body'>
      <h1>Home</h1>
      <TestSpring data={projectsInfo}/>
    </div>
  );
}

export default Home;