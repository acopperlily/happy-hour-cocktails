import React from "react";
import { FaInfoCircle } from 'react-icons/fa';

const Header = props => {
  return (
    <header>
      <h1 className="logo">Happy Hour Cocktails</h1>
      <div className="infoContainer">
        <FaInfoCircle className="info" />
      </div>
    </header>
  );
};

export default Header;