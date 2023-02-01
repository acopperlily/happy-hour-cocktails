import React from 'react';

const Ingredients = ({ measurements, ingredients }) => {

  const items = ingredients.map((item, index) => (
    <tr key={index}>
      <td className='measure'>{measurements[index]}</td>
      <td className='item'>{item}</td>
    </tr>
  ));

  return (
    <div className="ingredients">
      <h3>Ingredients</h3>
      <table>
        <tbody className='itemContainer'>
          {items}
        </tbody>
      </table>
    </div>
  );
};

export default Ingredients;