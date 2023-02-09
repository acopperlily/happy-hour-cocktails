import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import MainLogic from './components/MainLogic';

function App() {

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <MainLogic />
        <Footer />
      </div>
    </div>
  );
}

export default App
