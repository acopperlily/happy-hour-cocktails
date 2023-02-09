import React from "react";
import { useState } from 'react';

const Form = props => {
  const [searchValue, setSearchValue] = useState('');
  // const [filter, setFilter] = useState('none');

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  console.log('form prop ingredients:', props.drinks);

  const ingredients = [];
  for (let drink of props.drinks) {
    for (let ingredient of drink.ingredients) {
      let item = ingredient.toLowerCase();
      if (!ingredients.includes(item)) {
        ingredients.push(item);
      }
    }
    ingredients.sort();
  }

  // const handleFilter = e => {
  //   console.log('handleFilter:', e.target.value);
  //   setFilter(e.target.value);
  // };

  return (
    <div className="searchContainer">
      <h3>Search Drinks</h3>
      <form onSubmit={e => props.handleSubmit(e, searchValue)}>

        <label htmlFor="search">Search by Name</label>
        <input
          type="text"
          name="search" 
          id="search"
          value={searchValue}
          onChange={handleChange}
        />

        {props.drinks.length > 1 && <>
          <label htmlFor="filter">Filter</label>
          <select name="filter" id="filter" value={props.filter} onChange={e => props.handleFilter(e)}>
          <option value="none">-- None --</option>
          {ingredients.map((item, i) => (
            <option
              key={i}
              value={item}
            >
              {item}
            </option>
          ))}
          </select>
        </>}

        <button type="submit">{props.filter === 'none' ? 'Get Drinks' : 'Filter Drinks'}</button>
      </form>
  </div>
  );
};

export default Form;