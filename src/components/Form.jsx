import React, { useEffect } from "react";
import { useState } from 'react';
import { FaTimes } from "react-icons/fa";

const Form = props => {
  const [searchValue, setSearchValue] = useState('');
  const [ingredients, setIngredients] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const handleChange = e => {
    setSearchValue(e.target.value);
    setShowFilter(false);
  };

  // console.log('form prop ingredients:', props.allDrinks);

  useEffect(() => {
    const items = [];
    for (let drink of props.allDrinks) {
      for (let ingredient of drink.ingredients) {
        let item = ingredient.toLowerCase();
        // console.log('item in useEffect:', item);
        if (!items.includes(item)) {
          items.push(item);
        }
      }
    }
    items.sort();
    console.log('items array in useEffect:', items);
    console.log('show filter?', showFilter);
    setIngredients(items);
    if (props.allDrinks.length > 1) setShowFilter(true);
    setSearchValue(props.searchQuery);
  }, [props.allDrinks]);

  const clearSearch = () => {
    console.log('clar?');
    setSearchValue('');
    setShowFilter(false);
  };

  return (
    <div className="formContainer">
      <h3>Search Drinks</h3>
      <form onSubmit={e => props.handleSubmit(e, searchValue)}>

        <div className="searchContainer">
          <label htmlFor="search">Search by Name</label>
          <div className="inputContainer">
            <input
              type="text"
              name="search" 
              id="search"
              value={searchValue}
              onChange={handleChange}
            />
            <div className="deleteContainer">
              <FaTimes className="inputIcon" onClick={clearSearch} />
            </div>
          </div>
        </div>

        {showFilter && <div className="filterContainer">
          <label htmlFor="filter">Filter by Ingredient</label>
          <select
            name="filter"
            id="filter"
            value={props.filter}
            onChange={e => props.handleFilter(e)} 
          >
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