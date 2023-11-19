import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from './Footer';

function Profile() {
  const emailUserJSON = localStorage.getItem('user');
  const emailUser = emailUserJSON ? JSON.parse(emailUserJSON).email : '';
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/done-recipes');
  };

  const handleClickFavorite = () => {
    navigate('/favorite-recipes');
  };

  const handleClickLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <>
      <Header title="Profile" />
      <h1 data-testid="profile-email">{emailUser}</h1>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleClick }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleClickFavorite }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

export default Profile;
