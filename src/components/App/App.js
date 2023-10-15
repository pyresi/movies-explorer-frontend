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
  const [currentUser, setCurrentUser] = useState({});
  const [baseMaxMovieCards, setBaseMaxMovieCards] = useState(16);
  const [numberOfAdditionalCards, setNumberOfAdditionalCards] = useState(4);

  // const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  // const [email, setEmail] = useState('');
  // -----------------------------

  // Movies states
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [moviesShortFilmToggle, setMoviesShortFilmToggle] = useState(false);
  const [moviesMoreBtnClickedTimes, setMoviesMoreBtnClickedTimes] = useState(0);
  const [wasSearched, setWasSearched] = useState(false);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [moviesQuery, setMoviesQuery] = useState('');
  const [maxMoviesToShow, setMaxMoviesToShow] = useState(16);
  const [totalMoviesToShow, setTotalMoviesToShow] = useState(0);
  // -----------------------------

  //Saved-movies states
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesToShow, setSavedMoviesToShow] = useState([]);
  const [savedMoviesShortFilmToggle, setSavedMoviesShortFilmToggle] = useState(false);
  const [savedMoviesMoreBtnClickedTimes, setSavedMoviesMoreBtnClickedTimes] = useState(0);
  const [maxSavedMoviesToShow, setMaxSavedMoviesToShow] = useState(16);
  const [totalSavedMoviesToShow, setTotalSavedMoviesToShow] = useState(0);
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

  function queryMovies(query) {
    setWasSearched(true);
    setIsLoading(true);
    query = query.toLowerCase();

    moviesApi.call().then((res) => {
      const filtered = res.filter((x) => {
        return x.nameRU.toLowerCase().includes(query);
      }).map((x) => { return { ...x, thumbnail: 'https://api.nomoreparties.co' + x.image.url } });

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
    const filteredMovies = filterShortMovies(fetchedMovies, moviesShortFilmToggle);
    setTotalMoviesToShow(filteredMovies.length);
    setMoviesToShow(filteredMovies.slice(0, maxMoviesToShow));
    setIsLoading(false);
  }, [fetchedMovies, maxMoviesToShow, moviesShortFilmToggle,]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (windowSize.innerWidth > 768) {
        setNumberOfAdditionalCards(4);
        setBaseMaxMovieCards(16);
      }
      else if (windowSize.innerWidth <= 768) {
        setNumberOfAdditionalCards(2);
        setBaseMaxMovieCards(8);
      }

      if (windowSize.innerWidth <= 320) {
        setBaseMaxMovieCards(5);
      }
    }, 10)
    return () => clearTimeout(timer);
  }, [windowSize])

  useEffect(() => {
    setMaxMoviesToShow(baseMaxMovieCards + moviesMoreBtnClickedTimes * numberOfAdditionalCards);
  }, [baseMaxMovieCards, numberOfAdditionalCards, moviesMoreBtnClickedTimes])

  useEffect(() => {
    setMaxSavedMoviesToShow(baseMaxMovieCards + savedMoviesMoreBtnClickedTimes * numberOfAdditionalCards);
  }, [baseMaxMovieCards, numberOfAdditionalCards, savedMoviesMoreBtnClickedTimes])

  useEffect(() => {
    const filteredMovies = filterShortMovies(savedMovies, savedMoviesShortFilmToggle);
    setTotalSavedMoviesToShow(filteredMovies.length);
    setSavedMoviesToShow(filteredMovies.slice(0, maxSavedMoviesToShow));

  }, [savedMovies, maxSavedMoviesToShow, savedMoviesShortFilmToggle]);

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
    Promise.all([mainApi.getUserInfo(), mainApi.getMovies()]).then(([userData, savedMovies]) => {
      setCurrentUser(userData.data);

      setSavedMovies(savedMovies.data);
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies.data));
    }).catch(console.error);
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

  function handleLikeClick(movieInfo) {
    const filtered = savedMovies.filter(x => movieInfo.id === x.movieId);
    if (filtered.length > 0) {
      deleteMovie(filtered[0]);
    }
    else {
      addMovie(movieInfo);
    }
  }

  function addMovie(movieInfo) {
    mainApi.postMovie({
      country: movieInfo.country,
      director: movieInfo.director,
      duration: movieInfo.duration,
      year: movieInfo.year,
      description: movieInfo.description,
      image: 'https://api.nomoreparties.co' + movieInfo.image.url,
      trailerLink: movieInfo.trailerLink,
      nameRU: movieInfo.nameRU,
      nameEN: movieInfo.nameEN,
      thumbnail: 'https://api.nomoreparties.co' + movieInfo.image.url,
      movieId: movieInfo.id
    }).then((res) => {
      console.log(res);
      setSavedMovies([...savedMovies, res.data]);
    }).catch(console.error);
  }

  function deleteMovie(movieInfo) {
    mainApi.deleteMovie({ movieId: movieInfo._id }).then((res) => {
      console.log(res);
      setSavedMovies((state) => state.filter((item) => item.movieId !== res.data.movieId));
    }).catch(console.error);
  }

  useEffect(() => {
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies])

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
                isLoading={isLoading}
                moviesToShow={moviesToShow}
                setMoviesShortFilmToggle={handleMoviesShortFilmToggle}
                queryMovies={queryMovies}
                wasSearched={wasSearched}
                setMoviesMoreBtnClickedTimes={setMoviesMoreBtnClickedTimes}
                moviesMoreBtnClickedTimes={moviesMoreBtnClickedTimes}
                moviesShortFilmToggle={moviesShortFilmToggle}
                handleLikeClick={handleLikeClick}
                savedMovies={savedMovies}
                maxMoviesToShow={maxMoviesToShow}
                totalMoviesToShow={totalMoviesToShow}
              />
            } />
            <Route path="/saved-movies" element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={SavedMovies}
                savedMoviesShortFilmToggle={savedMoviesShortFilmToggle}
                setSavedMoviesShortFilmToggle={setSavedMoviesShortFilmToggle}
                savedMoviesMoreBtnClickedTimes={savedMoviesMoreBtnClickedTimes}
                setSavedMoviesMoreBtnClickedTimes={setSavedMoviesMoreBtnClickedTimes}
                handleLikeClick={deleteMovie}
                moviesToShow={savedMoviesToShow}
                savedMovies={savedMovies}
                totalMoviesToShow={totalSavedMoviesToShow}
                maxMoviesToShow={maxSavedMoviesToShow}
              />} />
            <Route path="*" element={<ErrorPage />} status={404} />
          </Routes>
          <SideMenu handleCloseSideMenuButtonClick={handleCloseSideMenuButtonClick} />
        </UserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;

