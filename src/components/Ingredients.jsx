import React, { Fragment } from 'react';

const Ingredients = ({ measurements, ingredients }) => {

  const items = ingredients.map((item, index) => (
    <Fragment key={index}>
      <span className="measure">{measurements[index]}</span>
      <span className='item'>{item}</span>
    </Fragment>
  ));

  return (
    <div className="ingredients">
      <h3>Ingredients</h3>
      <div className="itemContainer">
        <div className="itemGrid">
          {items}
        </div>
      </div>
    </div>
  );
};

export default Ingredients;