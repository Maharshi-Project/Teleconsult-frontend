
import { useEffect } from 'react';
import PageContent from './components/PageContent/PageContent';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import "./SeniorDoctor.css";

function SeniorDoctor() {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token") === null){
      navigate("/loginsd");
    }
  },[]);

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <PageContent/>
        <RightSide/>
      </div>
    </div>
  );
}

export default SeniorDoctor;
