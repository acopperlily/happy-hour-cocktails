import React from "react";

const Instructions = ({ instructions }) => {

  let style = {textAlign: 'justify'};
  if (instructions.length < 100) style.textAlign = 'center';

  return (
    <div className="details__instructions-container">
      <div className="details__title-wrapper">
        <h3 className="details__title">Instructions</h3>
      </div>
      <div className="details__text-wrapper">
        <p style={style} className="details__instructions details__text">{instructions}</p>
      </div>
    </div>
  );
};

export default Instructions;