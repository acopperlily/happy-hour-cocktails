import React from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Image = props => {

  return (
    <div className="imageContainer noSelect">
      {/* {props.len > 1 && <FaChevronLeft className="arrow sideArrow" onClick={e => props.scroll(-1)}/>} */}
      <img src={props.image} alt="" />
      {/* {props.len > 1 && <FaChevronRight className="arrow sideArrow" onClick={e => props.scroll(1)} />} */}
    </div>
  );
};

export default Image;