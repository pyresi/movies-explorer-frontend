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
import InfoTooltop from '../InfoTooltip/InfoTooltip';
import { MOVIE_API_URL_PREFIX, SHORT_MOVIES_LENGTH } from '../../utils/constants';
import BigPreloader from '../BigPreloader/BigPreloader';


function App() {

  // general states
  const [isPageLoaded, setIsPageLoaded] = useState(false);
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
  // const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [savedMoviesToShow, setSavedMoviesToShow] = useState([]);
  const [savedMoviesShortFilmToggle, setSavedMoviesShortFilmToggle] = useState(false);
  // const [savedMoviesMoreBtnClickedTimes, setSavedMoviesMoreBtnClickedTimes] = useState(0);
  // const [maxSavedMoviesToShow, setMaxSavedMoviesToShow] = useState(16);
  // const [totalSavedMoviesToShow, setTotalSavedMoviesToShow] = useState(0);
  const [isSavedMoviesLoading, setIsSavedMoviesLoading] = useState(false);
  const [savedMoviesQuery, setSavedMoviesQuery] = useState('');
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

  //Login
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [isToolTipSuccess, setIsToolTipSuccess] = useState(false);
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
    setMoviesMoreBtnClickedTimes(0);
    setMoviesQuery(query);
    localStorage.setItem('moviesQuery', query);
  }

  function checkIfMovieNameHasSubstring(movie, substring) {
    substring = substring.toLowerCase();
    return (movie.nameRU.toLowerCase().includes(substring)) || (movie.nameEN.toLowerCase().includes(substring))
  }

  function queryMovies(query) {
    setWasSearched(true);
    setIsLoading(true);
    handleMoviesQueryChange(query)
    query = query.toLowerCase();

    if (fetchedMovies.length === 0) {
      moviesApi.call().then((res) => {
        const fetched = res.map((x) => { return { ...x, thumbnail: 'https://api.nomoreparties.co' + x.image.url, movieId: x.id } });
        localStorage.setItem('fetchedMovies', JSON.stringify(fetched));
        setFetchedMovies(fetched);
      }).catch(console.error);
    }
  }

  function querySavedMovies(query) {
    // setIsSavedMoviesLoading(true);
    setSavedMoviesQuery(query);
  }

  function filterShortMovies(movies, isAllAllowed) {
    return movies.filter((x) => {
      return isAllAllowed ? true : (x.duration <= SHORT_MOVIES_LENGTH);
    })
  }

  useEffect(() => {

    const query = moviesQuery.toLowerCase();
    const filteredMovies = filterShortMovies(fetchedMovies.filter((x) => {
      return checkIfMovieNameHasSubstring(x, query);
    }), !moviesShortFilmToggle);

    setTotalMoviesToShow(filteredMovies.length);
    setMoviesToShow(filteredMovies.slice(0, maxMoviesToShow));
    setIsLoading(false);
  }, [fetchedMovies, maxMoviesToShow, moviesShortFilmToggle, moviesQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (windowSize.innerWidth > 1190) {
        setNumberOfAdditionalCards(4);
        setBaseMaxMovieCards(16);
      }
      else if (windowSize.innerWidth > 887) {
        setNumberOfAdditionalCards(3);
        setBaseMaxMovieCards(12);
      }
      else if (windowSize.innerWidth > 767) {
        setNumberOfAdditionalCards(2);
        setBaseMaxMovieCards(8);
      }
      else {
        setNumberOfAdditionalCards(2);
        setBaseMaxMovieCards(5);
      }
    }, 10)
    return () => clearTimeout(timer);
  }, [windowSize])

  useEffect(() => {
    setMaxMoviesToShow(baseMaxMovieCards + moviesMoreBtnClickedTimes * numberOfAdditionalCards);
  }, [baseMaxMovieCards, numberOfAdditionalCards, moviesMoreBtnClickedTimes])


  useEffect(() => {
    setIsSavedMoviesLoading(true);
    const query = savedMoviesQuery.toLowerCase();

    const filteredMovies = filterShortMovies(savedMovies.filter((x) => {
      return checkIfMovieNameHasSubstring(x, query);
    }), !savedMoviesShortFilmToggle);

    setSavedMoviesToShow(filteredMovies);
    setIsSavedMoviesLoading(false);

  }, [savedMovies, savedMoviesShortFilmToggle, savedMoviesQuery]);

  function handleRegisterClick(name, email, password) {
    mainApi
      .registerUser(name, email, password)
      .then((res) => {
        setIsToolTipSuccess(true);
        setIsInfoTooltipOpened(true);
        localStorage.setItem('token', res.data.token);
        login();
      }).then(() => {
        initialize();
      })
      .catch((err) => {
        setRegisterErrorMessage(err.message);
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
      }).then(() => {
        initialize();
        setLoginErrorMessage('');
      })
      .catch((err) => {
        setLoginErrorMessage(err.message);
      });
  }

  function handleLogoutClick() {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  }

  useEffect(() => {
    mainApi
      .verifyUser()
      .then(() => {

        setIsLoggedIn(true);
      })
      .then(initialize)
      .catch(console.error)
      .finally(() => {
        setIsPageLoaded(true);
      });
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

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        setIsInfoTooltipOpened(false);
      }
    }

    if (isInfoTooltipOpened) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isInfoTooltipOpened]);


  function handleEditProfileSubmit(name, email) {
    mainApi.patchuserInfo(name, email)
      .then((userData) => {
        setIsToolTipSuccess(true);
        setIsInfoTooltipOpened(true);
        setCurrentUser(userData.data);
        setIsEditing(false);
        setProfileErrorMessage('');
      })
      .catch((err) => {
        setProfileErrorMessage(err.message);
      })
  }

  function handleLikeClick(movieInfo) {
    const filtered = savedMovies.filter(x => movieInfo.movieId === x.movieId);
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
      image: MOVIE_API_URL_PREFIX + movieInfo.image.url,
      trailerLink: movieInfo.trailerLink,
      nameRU: movieInfo.nameRU,
      nameEN: movieInfo.nameEN,
      thumbnail: MOVIE_API_URL_PREFIX + movieInfo.image.url,
      movieId: movieInfo.movieId
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

  return (!isPageLoaded ? <BigPreloader /> : (
    <div className="page">
      <AppContext.Provider value={{ isLoading, setIsLoading, isSideMenuActive, setIsSideMenuActive }}>
        <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}>
          <Header windowSize={windowSize} />
          <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/signup" element={
              <ProtectedRoute
                loggedIn={!isLoggedIn}
                element={Register}
                onRegisterClick={handleRegisterClick}
                registerErrorMessage={registerErrorMessage}
              />} />
            <Route path="/signin" element={
              <ProtectedRoute
                loggedIn={!isLoggedIn}
                element={Login}
                loginErrorMessage={loginErrorMessage}
                onLoginClick={handleLoginClick}
              />} />
            <Route path="/profile" element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={Profile}
                onLogOut={handleLogoutClick}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editProfile={handleEditProfileSubmit}
                errorMsg={profileErrorMessage}
              />
            } />
            <Route path="/movies" element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={Movies}
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
                defaultSearchText={moviesQuery}
              />
            } />
            <Route path="/saved-movies" element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={SavedMovies}
                savedMoviesShortFilmToggle={savedMoviesShortFilmToggle}
                setSavedMoviesShortFilmToggle={setSavedMoviesShortFilmToggle}
                handleLikeClick={deleteMovie}
                moviesToShow={savedMoviesToShow}
                savedMovies={savedMovies}
                queryMovies={querySavedMovies}
                isSavedMoviesLoading={isSavedMoviesLoading}
              />} />
            <Route path="*" element={<ErrorPage />} status={404} />
          </Routes>
          <SideMenu handleCloseSideMenuButtonClick={handleCloseSideMenuButtonClick} />
          <InfoTooltop
            isOpen={isInfoTooltipOpened}
            setIsOpened={setIsInfoTooltipOpened}
            isSuccess={isToolTipSuccess}
          />
        </UserContext.Provider>
      </AppContext.Provider>
    </div>
  ));
}

export default App;

