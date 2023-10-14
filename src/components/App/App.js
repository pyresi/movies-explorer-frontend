import './App.css';
import Header from '../Header/Header';
import Page from '../Page/Page';
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
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


function App() {

  // general states
  const [isSideMenuActive, setIsSideMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({}); //хук состояния. нужен для изменения состояния компонента
  // const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  // const [email, setEmail] = useState('');
  // -----------------------------

  // Movies states
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [moviesShortFilmToggle, setMoviesShortFilmToggle] = useState(false);
  const [moviesMoreBtnClickedTimes, setMoviesMoreBtnClickedTimes] = useState(0);
  const [wasSearched, setWasSearched] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [moviesQuery, setMoviesQuery] = useState('');
  // -----------------------------

  //Saved-movies states

  // -----------------------------

  //Profile
  const [isEditing, setIsEditing] = useState(false);
  const [profileErrorMessage, setProfileErrorMessage] = useState('');
  // -----------------------------

  //Register
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  // -----------------------------

  //Login
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  // -----------------------------


  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const [windowSize, setWindowSize] = useState(getWindowSize());

  // const location = useLocation();
  const navigate = useNavigate();


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

  function handleMoviesQueryChange(query) {
    setMoviesQuery(query);
    localStorage.setItem('moviesQuery', query);
  }

  function queryMovies(query, isShortAllowed) {
    setWasSearched(true);
    setIsLoading(true);
    console.log(query);
    query = query.toLowerCase();

    moviesApi.call().then((res) => {
      const filtered = res.filter((x) => {
        return x.nameRU.toLowerCase().includes(query);
      });

      localStorage.setItem('fetchedMovies', JSON.stringify(filtered));
      setFetchedMovies(filtered);
    }).catch(console.error);
  }

  function filterShortMovies(movies, isShortAllowed) {
    return movies.filter((x) => {
      return isShortAllowed ? true : (x.duration >= 45);
    })
  }

  useEffect(() => {
    // console.log('Effect');
    if (fetchedMovies.length === 0) {
      setIsEmpty(true);
    }
    else {
      const filteredMovies = filterShortMovies(fetchedMovies, moviesShortFilmToggle);
      setMoviesToShow(filteredMovies);
      setIsEmpty(false);
    }
    setIsLoading(false);
  }, [fetchedMovies, moviesMoreBtnClickedTimes, moviesShortFilmToggle]);

  function handleRegisterClick(name, email, password) {
    mainApi
      .registerUser(name, email, password)
      .then(() => {
        // setIsRegistrationSuccess(true);
        navigate('/signin');
      })
      .catch(() => {

        // setIsAuthorizationPopupOpen(true);
        // setIsRegistrationSuccess(false);
      });
  }

  function login() {
    setIsLoggedIn(true);
    navigate('/movies');
  }

  function initialize() {
    return (
      mainApi.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData.data);
        })
        .catch(console.error)
    );
  }

  function handleLoginClick(email, password) {
    mainApi
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        login();
        // initialize();
      })
      .catch((err) => {
        console.error(err);
        // setIsAuthorizationPopupOpen(true);
        // setIsRegistrationSuccess(false);
      });
  }

  function handleLogoutClick() {
    localStorage.clear();
    // localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    mainApi
      .verifyUser()
      .then((res) => {
        setIsLoggedIn(true);
      })
      .then(initialize)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('moviesShortFilmToggle') !== null) {
      setMoviesShortFilmToggle(localStorage.getItem('moviesShortFilmToggle') === 'true');
    }

    if (localStorage.getItem('fetchedMovies') !== null) {
      setWasSearched(true);
      setFetchedMovies(JSON.parse(localStorage.getItem('fetchedMovies')));
    }

    if (localStorage.getItem('moviesQuery') !== null) {
      setMoviesQuery(localStorage.getItem('moviesQuery'));
    }
  }, [])

  function handleMoviesShortFilmToggle(value) {
    localStorage.setItem('moviesShortFilmToggle', value);
    setMoviesShortFilmToggle(value);
  }

  function handleEditProfileSubmit(name, email) {
    mainApi.patchuserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsEditing(false);
      })
      .catch(console.error)
  }

  return (
    <div className="page">
      <AppContext.Provider value={{ isLoading, setIsLoading, isSideMenuActive, setIsSideMenuActive }}>
        <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}>
          <Header windowSize={windowSize} />
          <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/signup" element={<Register onRegisterClick={handleRegisterClick} />} />
            <Route path="/signin" element={<Login onLoginClick={handleLoginClick} />} />
            <Route path="/profile" element={
              <Profile
                onLogOut={handleLogoutClick}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editProfile={handleEditProfileSubmit}
              />
            } />
            <Route path="/movies" element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={Movies}
                moviesQuery={moviesQuery}
                setMoviesQuery={handleMoviesQueryChange}
                isEmpty={isEmpty}
                isLoading={isLoading}
                moviesToShow={moviesToShow}
                setMoviesShortFilmToggle={handleMoviesShortFilmToggle}
                queryMovies={queryMovies}
                wasSearched={wasSearched}
                setMoviesMoreBtnClickedTimes={setMoviesMoreBtnClickedTimes}
                moviesMoreBtnClickedTimes={moviesMoreBtnClickedTimes}
                moviesShortFilmToggle={moviesShortFilmToggle}
              />
            } />
            <Route path="/saved-movies" element={<ProtectedRoute loggedIn={isLoggedIn} element={SavedMovies} />} />
            <Route path="*" element={<ErrorPage />} status={404} />
          </Routes>
          <SideMenu handleCloseSideMenuButtonClick={handleCloseSideMenuButtonClick} />
        </UserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;

