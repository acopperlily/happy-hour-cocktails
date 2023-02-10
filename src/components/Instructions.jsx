import React from "react";

const Instructions = ({ instructions }) => {

  let style = {textAlign: 'justify'};
  if (instructions.length < 100) style.textAlign = 'center';

  return (
    <div className="instructions">
      <h3>Instructions</h3>
      <p style={style} id={'actualInstructions'}>{instructions}</p>
    </div>
  );
};

export default Instructions;