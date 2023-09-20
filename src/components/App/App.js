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

function App() {

  return (
    <div className="page">
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={
            <Page />
          }
        />
        <Route
          path="/sign-up"
          element={<Register />}
        />
        <Route
          path="/sign-in"
          element={<Login />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/error"
          element={<ErrorPage />}
        />
        <Route
          path="/movies"
          element={<Movies />}
        />
        <Route
          path="/saved-movies"
          element={<SavedMovies />}
        />
      </Routes>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;

