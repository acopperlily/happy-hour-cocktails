import React from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Image = props => {

  return (
    <div className="imageContainer noSelect">
      <FaChevronLeft className="arrow" onClick={e => props.scroll(-1)}/>
      <img src={props.image} alt="" />
      <FaChevronRight className="arrow" onClick={e => props.scroll(1)} />
    </div>
  );
};

export default Image;