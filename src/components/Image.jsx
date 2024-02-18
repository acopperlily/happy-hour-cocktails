import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Image = ({ image, container, tags }) => {
  const imageRef = useRef(null);

  let altText = `Drink in ${container}`;
  if (tags) {
    altText += ` tagged with ${tags.split(',').join(', ')}`;
  }

  return (
    <div ref={imageRef} className="imageContainer noSelect">
      {/* {props.len > 1 && <FaChevronLeft className="arrow sideArrow" onClick={e => props.scroll(-1)}/>} */}
      <img src={image} alt={altText} />
      {/* {props.len > 1 && <FaChevronRight className="arrow sideArrow" onClick={e => props.scroll(1)} />} */}
    </div>
  );
};

export default Image;
