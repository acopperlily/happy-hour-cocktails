import React from "react";

const NavDots = ({ num, current, handleClick }) => {

  const dots = Array(num).fill('');

  return (
    <div className="navDots" onClick={e => handleClick(e)}>
      {dots.map((dot, i) => (
        <div 
          key={i}
          value={i}
          className={current === i ? 'dotContainer active' : 'dotContainer'}
        >
          <div value={i} className={current === i ? 'dot active' : 'dot'}></div>
        </div>
      ))}
    </div>
  );
};

export default NavDots;