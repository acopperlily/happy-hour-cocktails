import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NavDots = ({ num, current, handleClick, scroll }) => {

  const dots = Array(num).fill('');

  const showHiddenDots = e => {
    e.target.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  };

  return (
    <div className="navContainer noSelect">
      <FaChevronLeft className="arrow bottomArrow" onClick={e => scroll(-1)} />
      <div className="navDots" onClick={e => handleClick(e)}>
        {dots.map((dot, i) => (
          <div 
            key={i}
            value={i}
            className="dotContainer"
          >
            <div
              value={i}
              className={current === i ? 'dot active' : 'dot'}
              onAnimationEnd={showHiddenDots}
            >
            </div>
          </div>
        ))}
      </div>
      <FaChevronRight className="arrow bottomArrow" onClick={e => scroll(1)} />
    </div>
  );
};

export default NavDots;