import React from "react";
import { FaInfoCircle } from 'react-icons/fa';

const Header = props => {
  return (
    <header className="header">
      <div className="header__container container">
        <h1 className="header__logo">Happy Hour Cocktails</h1>
        <FaInfoCircle className="header__info clickable" onClick={props.toggleModal} />
      </div>
    </header>
  );
};

export default Header;