import React from "react";
import { useState, useEffect } from 'react';
import margaritas from '../margaritas';
import rum from '../rum';
import gin from "../gin";
import someDrinks from '../drinks';
import Form from "./Form";
import Image from "./Image";
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import NavDots from "./NavDots";

const Main = props => {
  const [allDrinks, setAllDrinks] = useState([]);
  const [currentDrinks, setCurrentDrinks] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDrink, setCurrentDrink] = useState(0);
  const [filter, setFilter] = useState('none');
  // console.log('allDrinks:', margaritas);
  // console.log('main props', props.randomDrink);


  const getList = (drink, item) => {
    const list = [];
    for (let [k, v] of Object.entries(drink)) {
      if (k.startsWith(item) && v !== null) {
        list.push(v);
        v = v.toLowerCase();
        if (item === 'strIngredient' && !ingredientsList.includes(v)) {
          setIngredientsList(prevList => [...prevList].concat(v));
        }
      }
    }
    return list;
  }

  const handleSubmit = (e, searchValue) => {
    e.preventDefault();
    console.log(e);
    console.log(searchValue);
    searchValue = searchValue.trim();
    setSearchQuery(searchValue);
  };

  useEffect(() => {
    const getDrinks = async () => {
      let dranks; // this will change with API call
      let data;
      let res;
      if (!searchQuery) {
        data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        res = await data.json();
        dranks = res.drinks;
        console.log('fetch drinks', dranks);
      }

      else if (searchQuery === 'rum') dranks = rum;
      else if (searchQuery === 'gin') dranks = gin;
      else if (searchQuery === 'margarita') dranks = margaritas;
      else dranks = someDrinks;
      console.log('drinks inside effect:', dranks);
      let details = [];
      if (dranks.length > 20) dranks = dranks.slice(0, 20);
      for (let drink of dranks) {
        // console.log('async:', drink);
        details.push({
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
          instructions: drink.strInstructions,
          measurements: getList(drink, 'strMeasure'),
          ingredients: getList(drink, 'strIngredient')
        });
      }
      console.log('DEETS:', details);
      setCurrentDrink(0);
      setAllDrinks(details);
      setCurrentDrinks(details);
    }
    console.log('effect, current drink:', currentDrink);
    setFilter('none');
    setIngredientsList([]);
    getDrinks();
  }, [searchQuery]);

  useEffect(() => {
    console.log('drinks:', allDrinks);
    // const formattedFilter = filter[0].toUpperCase() + filter.slice(1);
    // const filteredDrinks = allDrinks.filter(drink => drink.ingredients.includes(formattedFilter));
    if (filter !== 'none') {
      const filteredDrinks = allDrinks.filter(drink => drink.ingredients.map(item => item.toLowerCase()).includes(filter.toLowerCase()));
      console.log('filteredDrinks:', filteredDrinks);
      setCurrentDrinks(filteredDrinks);
    } else {
      setCurrentDrinks(allDrinks);
    }
    setCurrentDrink(0);
  }, [filter]);

  const scrollImage = (i) => {
    const len = currentDrinks.length;
    if (i === -1 && currentDrink === 0) i = len - 1;
    setCurrentDrink(currentDrink => (currentDrink + i) % len);
  };

  const imageNav = e => {
    const nextDrink = +e.target.getAttribute('value');
    console.log('e', e.target);
    console.log('next:', nextDrink);
    setCurrentDrink(nextDrink);
    console.log('ingredients:', ingredientsList);
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const deleteInput = e => {
    console.log('delete? show filter?', filter);
    // setSearchQuery('');
    setFilter('none');
  };

  return (
    <main>
      {currentDrinks.length && <Form searchQuery={searchQuery} handleSubmit={handleSubmit} allDrinks={allDrinks} currentDrinks={currentDrinks} filter={filter} handleFilter={handleFilter} deleteInput={deleteInput}/>}

      {currentDrinks.length && <div className="fetchedInfo">
        <div className="imageInfo">
          <h2>{currentDrinks[currentDrink].name}</h2>
          <Image image={currentDrinks[currentDrink].image} scroll={scrollImage} len={currentDrinks.length}/>
          {currentDrinks.length > 1 && <NavDots num={currentDrinks.length} current={currentDrink} handleClick={imageNav} scroll={scrollImage}/>}
        </div>

        <div className="detailsContainer">
          <Ingredients measurements={currentDrinks[currentDrink].measurements} ingredients={currentDrinks[currentDrink].ingredients} />
          <Instructions instructions={currentDrinks[currentDrink].instructions} />
        </div>
      </div>}

    </main>
  );
};

export default Main;