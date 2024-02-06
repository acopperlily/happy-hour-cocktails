import React, { Fragment } from 'react';

const Ingredients = ({ measurements, ingredients }) => {

  const items = ingredients.map((item, index) => (
    <Fragment key={index}>
      <p className="details__measure details__text">{measurements[index]}</p>
      <p className='details__item details__text'>{item}</p>
    </Fragment>
  ));

  return (
    <div className="details__ingredients-container">
      <div className="details__title-wrapper">
        <h3 className='details__title'>Ingredients</h3>
      </div>
      <div className="details__item-container">
        <div className="details__item-grid">
          {items}
        </div>
      </div>
    </div>
  );
};

export default Ingredients;