import React from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Image = ({ image, container, tags }) => {

  let altText = `Drink in ${container}`;
  if (tags) {
    altText += ` tagged with ${tags.split(',').join(', ')}`;
  }

  return (
    <div className="imageContainer noSelect">
      {/* {props.len > 1 && <FaChevronLeft className="arrow sideArrow" onClick={e => props.scroll(-1)}/>} */}
      <img src={image} alt={altText} />
      {/* {props.len > 1 && <FaChevronRight className="arrow sideArrow" onClick={e => props.scroll(1)} />} */}
    </div>
  );
};

export default Image;
