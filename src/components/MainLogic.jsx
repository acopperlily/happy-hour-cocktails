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
import errorWater from "../errorWater";
import waterImg from '../assets/lemonWater.jpg';

const MainLogic = props => {
  const [allDrinks, setAllDrinks] = useState([]);
  const [currentDrinks, setCurrentDrinks] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDrink, setCurrentDrink] = useState(0);
  const [filter, setFilter] = useState('none');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
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
    searchValue = searchValue.trim().toLowerCase();
    setSearchQuery(searchValue);
    setIsLoading(true);
  };

  useEffect(() => {
    const getDrinks = async () => {
      let url = 'https://www.thecocktaildb.com/api/json/v1/1/';

      url += searchQuery
        ? `search.php?s=${searchQuery}`
        : 'random.php';

      let details = [];

      try {
        const res = await fetch(url);
        // Test for gateway timeout
        // const res = await fetch('https://httpstat.us/504?sleep=10000');
        const data = await res.json();
        const dranks = data.drinks;
        console.log('fetch drinks:', dranks);

        if (dranks) {
          for (let drink of dranks) {
            details.push({
              id: drink.idDrink,
              name: drink.strDrink,
              image: drink.strDrinkThumb,
              instructions: drink.strInstructions,
              measurements: getList(drink, 'strMeasure'),
              ingredients: getList(drink, 'strIngredient')
            });
          }
        } else {
          details.push({
            id: 'no',
            name: 'water', 
            image: waterImg,
            instructions: "Uh oh, time to rehydrate! Either your drink is not listed in the database, or you've already had one too many. Please check your spelling or try searching for a different drink.",
            measurements: ['2', '1'],
            ingredients: ['Hydrogen', 'Oxygen', 'Ice cubes', 'Lemon wedge']
          });
        }
        console.log('DEETS:', details);

      } catch (err) {
        console.log('Error:', err);
        setError(true);
        details.push({
          id: 'no',
          name: 'water', 
          image: waterImg,
          instructions: "Uh oh, something went wrong. Time to rehydrate!",
          measurements: ['2', '1'],
          ingredients: ['Hydrogen', 'Oxygen', 'Ice cubes', 'Lemon wedge']
        });

      } finally {
        setIsLoading(false);
        setCurrentDrink(0);
        setAllDrinks(details);
        setCurrentDrinks(details);
      }

    }
    
    console.log('effect, current drink:', currentDrink);
    setFilter('none');
    setIngredientsList([]);
    getDrinks();
  }, [searchQuery]);

  useEffect(() => {
    console.log('drinks:', allDrinks);
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
    setFilter('none');
  };

  return (
    <main>
      <Form searchQuery={searchQuery} handleSubmit={handleSubmit} allDrinks={allDrinks} currentDrinks={currentDrinks} filter={filter} handleFilter={handleFilter} deleteInput={deleteInput}/>

      {isLoading ? <h1 className="loading">Loading....</h1> : <div className="drink-info__container container">
        {/* <h2 className="drink-title">{currentDrinks[currentDrink].name}</h2> */}
        <div className="drink-info__image-container">
          {/* <h2>{currentDrinks[currentDrink].name}</h2> */}
          <Image
            image={currentDrinks[currentDrink].image}
            scroll={scrollImage}
            len={currentDrinks.length}
          />
          {currentDrinks.length > 1 && <NavDots num={currentDrinks.length} current={currentDrink} handleClick={imageNav} scroll={scrollImage}/>}
        </div>

        <div className="drink-info__details-container">
          <h2 className="drink-info__title">{currentDrinks[currentDrink].name}</h2>
          <div className="drink-info__details">
            <Ingredients
              measurements={currentDrinks[currentDrink].measurements} ingredients={currentDrinks[currentDrink].ingredients}
            />
            <Instructions
              instructions={currentDrinks[currentDrink].instructions}
            />
          </div>
        </div>
      </div>}

    </main>
  );
};

export default MainLogic;
