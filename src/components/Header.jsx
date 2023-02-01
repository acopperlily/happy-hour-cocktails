import React from "react";
import { FaInfoCircle } from 'react-icons/fa';
import cocktails from '../assets/singleCocktail.png';

const Header = props => {
  return (
    <header>
      {/* <img src={cocktails} alt=""/> */}
      <h1 className="logo">Happy Hour Cocktails</h1>
      <div className="infoContainer">
        <FaInfoCircle className="info" />
      </div>
    </header>
  );
};

export default Header;