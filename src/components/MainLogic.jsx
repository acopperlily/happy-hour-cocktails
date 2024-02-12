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


const MainLogic = () => {
  const [allDrinks, setAllDrinks] = useState([]);
  const [currentDrinks, setCurrentDrinks] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDrink, setCurrentDrink] = useState(0);
  const [filter, setFilter] = useState('none');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false)


  const formatData = drinks => {
    const processedDrinkData = [];
    for (let drink of drinks) {
      processedDrinkData.push({
        id: drink.idDrink,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        instructions: drink.strInstructions,
        measurements: getList(drink, 'strMeasure'),
        ingredients: getList(drink, 'strIngredient')
      });
    }
    return processedDrinkData;
  }


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

  // Handle user input for search query
  const handleInputChange = text => {
    setSearchQuery(text);
  };

  const deleteInput = () => {
    setSearchQuery('');
    setFilter('none');
  };


  // Validate user input and initiate fetch request
  const handleSubmit = e => {
    e.preventDefault();
    let text = searchQuery.trim().toLowerCase();
    setSearchQuery(text);
    setIsLoading(true);
    setTriggerFetch(!triggerFetch);
  }

  useEffect(() => {
    let isFetchSuccessful = false;

    // This aborts erroneous requests
    const controller = new AbortController();
    const signal = controller.signal;

    const getDrinks = async () => {
      let url = 'https://www.thecocktaildb.com/api/json/v1/1/';

      url += searchQuery
        ? `search.php?s=${searchQuery}`
        : 'random.php';

      try {
        setError(false)
        const res = await fetch(url, { signal });
        // const res = await fetch(url);
        console.log('res:', res);
        if (!res.ok) {
          // setError(true);
          // throw new Error('Failed to fetch');
          console.log('not ok');
        }

        const data = await res.json();
        console.log('data:', data);
        const dranks = data.drinks || [errorWater];

        console.log('fetch drinks:', dranks);

        const allDrinks = formatData(dranks);
        setAllDrinks(allDrinks);
        setCurrentDrinks(allDrinks);
        // setCurrentDrink(0)

        console.log('DEETS:', allDrinks);
        isFetchSuccessful = true;

      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.log('Error:', err);
        }

      } finally {
        if (!isFetchSuccessful) {
          const water = [
            {
              ...errorWater,
              strInstructions: 'Uh oh, something went wrong. Time to rehydrate!'
            }
          ];
          console.log('water:', water);
          const formattedWater = formatData(water)
          setAllDrinks(formattedWater)
          setCurrentDrinks(formattedWater)
        }
        setError(false)
        setIsLoading(false);
        // setTimeout(() => setIsLoading(false), 1000)
        setCurrentDrink(0);

        console.log('finally?', allDrinks)
        setFilter('none');
        setIngredientsList([]);
      }


    }
    
    getDrinks();
    console.log('effect, current drink:', currentDrink); 

    return () => {
      controller.abort();
    }
  }, [triggerFetch]);

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

  // Display drinks filtered by ingredient on button click
  const handleFilterSubmit = () => {
    console.log('handle filter submit:', allDrinks);
    if (filter !== 'none') {
      const filteredDrinks = allDrinks.filter(drink => drink.ingredients.map(item => item.toLowerCase()).includes(filter.toLowerCase()));
      console.log('filteredDrinks:', filteredDrinks);
      setCurrentDrinks(filteredDrinks);
    } else {
      setCurrentDrinks(allDrinks);
    }
    setCurrentDrink(0);
  }


  return (
    <main>
      <Form
        isLoading={isLoading}
        searchQuery={searchQuery}
        handleSubmit={handleSubmit}
        allDrinks={allDrinks}
        currentDrinks={currentDrinks}
        filter={filter}
        handleFilter={handleFilter} 
        onDeleteInput={deleteInput}
        onInputChange={handleInputChange}
        onFilterSubmit={handleFilterSubmit}
      />

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
