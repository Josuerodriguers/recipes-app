import { useNavigate } from 'react-router-dom';
import style from './Footer.module.css';

function Footer() {
  const navigate = useNavigate();
  const toDrinks = () => navigate('/drinks');
  const toMeals = () => navigate('/meals');
  return (
    <section
      className={ style.footerContainer }
    >
      <footer
        className={ style.footer }
        data-testid="footer"
      >
        <button
          onClick={ toDrinks }
        >
          <img
            className={ style.drinkIcon }
            src="/src/images/drinkIcon.svg"
            alt="Drink Icon"
            data-testid="drinks-bottom-btn"
          />
          Drinks
        </button>
        <button onClick={ toMeals }>
          <img
            className={ style.mealIcon }
            src="src/images/mealIcon.svg"
            alt="Meal Icon"
            data-testid="meals-bottom-btn"
          />
          Meals
        </button>

      </footer>
    </section>
  );
}

export default Footer;
