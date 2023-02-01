import React from "react";
import { useState } from 'react';

const Form = props => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

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
        <button type="submit">Get Drinks</button>
      </form>
  </div>
  );
};

export default Form;