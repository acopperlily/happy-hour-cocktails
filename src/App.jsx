import { useState } from 'react'
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import MainLogic from './components/MainLogic';
import Modal from './components/Modal';

function App() {
  const [displayInfo, setDisplayInfo] = useState(false);

  const toggleModal = e => {
    console.log('toggle modal');
    setDisplayInfo(!displayInfo);
  };

  return (
    <div className="App">
      {displayInfo && <Modal toggleModal={toggleModal} />}
      <div
        className="wrapper"
        style={displayInfo ? {filter: 'blur(20px)'} : {filter: 'none'}}
        onClick={displayInfo ? toggleModal : null}
      >
        <Header toggleModal={toggleModal} />
        <MainLogic />
        <Footer />
      </div>
    </div>
  );
}

export default App;
