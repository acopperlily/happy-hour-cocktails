import React from "react";
import { useState, useEffect } from 'react';
import margaritas from '../margaritas';
import rum from '../rum';
import gin from "../gin";
import allDrinks from '../drinks';
import Form from "./Form";
import Image from "./Image";
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import NavDots from "./NavDots";

const Main = () => {
  const [drinks, setDrinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDrink, setCurrentDrink] = useState(0);
  // console.log('drinks:', margaritas);


  const getList = (drink, item) => {
    const list = [];
    for (let [k, v] of Object.entries(drink)) {
      if (k.startsWith(item) && v !== null)
        list.push(v);
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
    const getDrinks = () => {
      let drinks; // this will change with API call
      if (searchQuery === 'rum') drinks = rum;
      else if (searchQuery === 'gin') drinks = gin;
      else if (searchQuery === 'margarita') drinks = margaritas;
      else drinks = allDrinks;
      console.log('drinks inside effect:', drinks);
      let details = [];
      if (drinks.length > 20) drinks = drinks.slice(0, 20);
      for (let drink of drinks) {
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
      // console.log('DEETS:', details);
      setCurrentDrink(0);
      setDrinks(details);
    }
    console.log('effect, current drink:', currentDrink);
    getDrinks();
  }, [searchQuery]);

  const scrollImage = (i) => {
    const len = drinks.length;
    if (i === -1 && currentDrink === 0) i = len - 1;
    setCurrentDrink(currentDrink => (currentDrink + i) % len);
  };

  const imageNav = e => {
    const nextDrink = +e.target.getAttribute('value');
    console.log('e', e.target);
    console.log('next:', nextDrink);
    setCurrentDrink(nextDrink);
  };

  return (
    <main>
      <Form handleSubmit={handleSubmit} />

      {drinks.length && <div className="fetchedInfo">
        <div className="imageInfo">
          <h2>{drinks[currentDrink].name}</h2>
          <Image image={drinks[currentDrink].image} scroll={scrollImage}/>
          <NavDots num={drinks.length} current={currentDrink} handleClick={imageNav}/>
        </div>

        <div className="detailsContainer">
          <Ingredients measurements={drinks[currentDrink].measurements} ingredients={drinks[currentDrink].ingredients} />
          <Instructions instructions={drinks[currentDrink].instructions} />
        </div>
      </div>}

    </main>
  );
};

export default Main;