import './App.css';
import Header from '../Header/Header';
import Page from '../Page/Page';
import Footer from '../Footer/Footer.js';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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

  const location = useLocation();


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
          <Header />
          <Routes>
            <Route path="/" element={<><Page /> <Footer /></>} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movies" element={<><Movies /> <Footer /></>} />
            <Route path="/saved-movies" element={<><SavedMovies /> <Footer /></>} />
            <Route path="*" element={<ErrorPage />} status={404} />
          </Routes>
          {/* {['/signin', '/signup'].includes(location.pathname) ? <></> : <Footer />} */}
          <SideMenu />
        </UserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;

