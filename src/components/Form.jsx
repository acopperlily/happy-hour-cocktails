import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const Form = props => {
  const [ingredients, setIngredients] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const handleChange = e => {
    props.onInputChange(e.target.value);
    setShowFilter(false);
  };

  // allDrinks[], currentDrinks[], deleteInput(), filter, handleFilter(), handleSubmit(), searchQuery
  console.log('form props:', props);

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
    // console.log('show filter?', showFilter);
    setIngredients(items);
    if (props.allDrinks.length > 1) setShowFilter(true);
  }, [props.allDrinks]);

  const clearSearch = () => {
    props.onDeleteInput();
    // setShowFilter(false);
  };

  return (
    <section className="hero">
      <div className="hero__container">
        <h1 className="hero__title">Every hour is <span className="hero__title_highlight">Happy Hour</span></h1>
        <p className="hero__text">Thirsty for something different? Search for drinks freshly served up by TheCocktailDB API. Tiny umbrellas not included.</p>

        <div className="hero__form_container">
          <form className="hero__form" onSubmit={e => props.handleSubmit(e)}>
            <div className="form__search">
              <label className="form__label" htmlFor="search">Search by Name</label>
              <div className="form__input">
                <input
                  type="text"
                  name="search" 
                  id="search"
                  value={props.searchQuery}
                  onChange={handleChange}
                />
                <FaTimes 
                  className="form__delete_icon form__icon clickable"
                  onClick={clearSearch} 
                />

              </div>
              <button className="form__btn form__btn_primary clickable" type="submit">Get Drinks</button>
            </div>

            {showFilter && <div className="form__filter">
              <label className="form__label" htmlFor="filter">Filter by Ingredient</label>
              <div className="form__select">
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
                <FaChevronDown className="form__delete_icon form__icon clickable" />
              </div>
              <button className="form__btn form__btn_secondary clickable" type="submit">Filter Drinks</button>
            </div>}

          </form>
        </div>
      </div>

    </section>
  );
};

export default Form;
