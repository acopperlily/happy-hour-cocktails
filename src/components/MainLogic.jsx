import React from "react";
import { useState, useEffect, useRef } from 'react';
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
import lemonWater from "/lemonWater.jpg";


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
  const imageRef = useRef(null);


  const formatData = drinks => {
    const processedDrinkData = [];
    for (let drink of drinks) {
      processedDrinkData.push({
        id: drink.idDrink,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        container: drink.strGlass,
        tags: drink.strTags,
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
    
    // Yeet suspicious characters
    text = text.replace(/[^a-z\s]/g, '');
    setSearchQuery(text);
    setIsLoading(true);
    setTriggerFetch(!triggerFetch);
    imageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        console.log('res:', res);
        if (!res.ok) {
          setError(true);
          console.error('not ok');
        }

        const data = await res.json();
        console.log('data:', data);
        if (data.drinks !== null) {
          const dranks = data.drinks;
          console.log('fetch drinks:', dranks);

          const allDrinks = formatData(dranks);
          setAllDrinks(allDrinks);
          setCurrentDrinks(allDrinks);
          isFetchSuccessful = true;
        }

      } catch (err) {
        setError(true);
        if (err.name === 'AbortError') {
          console.error('Fetch aborted', err);
        } else {
          console.error('Error:', err);
        }

      } finally {
        if (!isFetchSuccessful) {
          setError(true);
          const water = [
            {
              ...errorWater,
              strDrinkThumb: '/lemonWater.jpg',
            }
          ];
          console.log('water:', water);
          const formattedWater = formatData(water)
          setAllDrinks(formattedWater)
          setCurrentDrinks(formattedWater)
        }
        setIsLoading(false);
        setCurrentDrink(0);

        console.log('finally?', allDrinks)
        setFilter('none');
        setIngredientsList([]);
      }
      console.log('is fetch successful?', isFetchSuccessful);

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
    imageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        <div ref={imageRef} className="drink-info__image-container">
          {/* <h2>{currentDrinks[currentDrink].name}</h2> */}
          <Image
            image={error ? lemonWater : currentDrinks[currentDrink].image}
            container={currentDrinks[currentDrink].container}
            tags={currentDrinks[currentDrink].tags}
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
