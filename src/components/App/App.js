import './App.css';
import Header from '../Header/Header';
import Page from '../Page/Page';
import Footer from '../Footer/Footer.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile';
import ErrorPage from '../ErrorPage/ErrorPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { useEffect, useState } from 'react';
import { AppContext } from '../../contexts/CurrentAppContext';
import SideMenu from '../SideMenu/SideMenu';
import { UserContext } from '../../contexts/CurrentUserContext';

function App() {

  const [isSideMenuActive, setIsSideMenuActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);


  function handleCloseSideMenuButtonClick() {
    setIsSideMenuActive(false);
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        handleCloseSideMenuButtonClick();
      }
    }
    if (isSideMenuActive) {
      // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isSideMenuActive]);

  return (
    <div className="page">
      <AppContext.Provider value={{ isLoading, setIsLoading, isSideMenuActive, setIsSideMenuActive }}>
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route path="*" element={<ErrorPage />} status={404} />
          </Routes>
          <Footer></Footer>
          <SideMenu />
        </UserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;

