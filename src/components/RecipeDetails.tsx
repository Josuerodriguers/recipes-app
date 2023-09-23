import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './RecipeDetails.module.css';

type RecipeDetailsProps = {
  mealOrDrink: 'meal' | 'drink';
};

const mealsApiBase = 'https://www.themealdb.com/api/json/v1/1/';
const drinksApiBase = 'https://www.thecocktaildb.com/api/json/v1/1/';

// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id-da-receita}.
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=.

// https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-da-receita}.
// https://www.themealdb.com/api/json/v1/1/search.php?s=.

// strCategory
// strMealThumb
// strMeal

function RecipeDetails(props: RecipeDetailsProps) {
  const { mealOrDrink } = props;
  const { recipeID } = useParams();

  const [recipeDetails, setRecipeDetails] = useState<any>({});
  const [recomendations, setRecomendations] = useState<any[]>([]);

  const getIngredients = () => Object
    .entries(recipeDetails)
    .filter(([key, value]) => key.includes('strIngredient') && value)
    .map((values, index) => `${values[1]} ${recipeDetails[`strMeasure${index + 1}`]}`);

  useEffect(() => {
    const getData = async () => {
      const DetailsUrl = mealOrDrink === 'meal' ? mealsApiBase : drinksApiBase;
      const RecomendationsUrl = mealOrDrink === 'meal' ? drinksApiBase : mealsApiBase;
      const detailsResponse = await fetch(`${DetailsUrl}lookup.php?i=${recipeID}`);
      const recomendationResponse = await fetch(`${RecomendationsUrl}search.php?s=`);
      const details = await detailsResponse.json();
      const recomendData = await recomendationResponse.json();
      setRecipeDetails(details.meals?.[0] || details.drinks?.[0]);
      setRecomendations(recomendData.meals || recomendData.drinks);
    };

    getData();
  }, [mealOrDrink, recipeID]);

  console.log(recipeDetails);
  console.log(recomendations);

  if (Object.entries(recipeDetails).length === 0) return (<div>Loading...</div>);

  return (
    <>
      <div className={ style.recipeCoverWrapper }>
        <img
          data-testid="recipe-photo"
          className={ style.recipeThumb }
          src={ recipeDetails?.strMealThumb || recipeDetails?.strDrinkThumb }
          alt="recipeThumb"
        />
        <h1
          className={ style.recipeTitle }
          data-testid="recipe-title"
        >
          {recipeDetails?.strMeal || recipeDetails?.strDrink}

        </h1>
        <h3
          className={ style.recipeCategory }
          data-testid="recipe-category"
        >
          {
          (mealOrDrink === 'meal')
            ? recipeDetails?.strCategory
            : recipeDetails?.strAlcoholic
          }

        </h3>
      </div>

      <div>
        <h3>Ingredients</h3>
        <ul>
          {getIngredients().map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient as string}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipeDetails?.strInstructions}</p>
      </div>
      {mealOrDrink === 'meal' && (
        <div className={ style.recipeVideo }>
          <iframe
            title={ recipeDetails?.strMeal }
            src={ recipeDetails?.strYoutube.replace('watch?v=', 'embed/') }
            allowFullScreen
            data-testid="video"
          />
        </div>

      )}
      <div
        className={ style.recipeCarousel }
      >
        {recomendations.slice(0, 6).map((recomendation, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              src={ recomendation?.strMealThumb || recomendation?.strDrinkThumb }
              alt="recipeThumb"
            />
            <h3
              data-testid={ `${index}-recommendation-title` }
            >
              {recomendation?.strMeal || recomendation?.strDrink}

            </h3>
          </div>
        ))}
      </div>
      <button
        className={ style.startRecipeBtn }
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </>
  );
}

// Os ingredientes devem ter o atributo data-testid="${index}-ingredient-name-and-measure".
// O texto de instruções deve ter o atributo data-testid="instructions".
// O vídeo, presente somente na tela de comidas, deve ter o atributo data-testid="video".

export default RecipeDetails;
