import React, { useEffect } from "react";
import { useState } from 'react';

const Form = props => {
  const [searchValue, setSearchValue] = useState('');
  const [ingredients, setIngredients] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const handleChange = e => {
    setSearchValue(e.target.value);
    setShowFilter(false);
  };

  console.log('form prop ingredients:', props.allDrinks);

  useEffect(() => {
    const items = [];
    for (let drink of props.allDrinks) {
      for (let ingredient of drink.ingredients) {
        let item = ingredient.toLowerCase();
        console.log('item in useEffect:', item);
        if (!items.includes(item)) {
          items.push(item);
        }
      }
    }
    items.sort();
    console.log('items array in useEffect:', items);
    setIngredients(items);
    if (props.allDrinks.length > 1) setShowFilter(true);
  }, [props.allDrinks]);

  return (
    <div className="formContainer">
      <h3>Search Drinks</h3>
      <form onSubmit={e => props.handleSubmit(e, searchValue)}>

        <div className="searchContainer">
          <label htmlFor="search">Search by Name</label>
          <input
            type="text"
            name="search" 
            id="search"
            value={searchValue}
            onChange={handleChange}
          />
        </div>

        {showFilter && <div className="filterContainer">
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
        </div>}

        <button type="submit">{showFilter ? 'Filter Drinks' : 'Get Drinks'}</button>
      </form>
  </div>
  );
};

export default Form;