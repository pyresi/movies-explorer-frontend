import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import './Movies__more-btn.css';

function Movies({
    isEmpty,
    isLoading,
    moviesToShow,
    moviesShortFilmToggle,
    setMoviesShortFilmToggle,
    queryMovies,
    wasSearched,
    moviesQuery,
    setMoviesQuery,
    setMoviesMoreBtnClickedTimes,
    moviesMoreBtnClickedTimes,
}) {
    let moviesComponent = <></>;
    if (wasSearched) {
        if (isLoading === true) {
            moviesComponent = <Preloader />;
        }
        else if (isEmpty === true) {
            moviesComponent = <p>Пусто</p>;
        }
        else {
            moviesComponent = <MoviesCardList moviesToShow={moviesToShow} />;
        }
    }

    return (
        <>
            <div className="movies">
                <SearchForm
                    setMoviesShortFilmToggle={setMoviesShortFilmToggle}
                    queryMovies={queryMovies}
                    moviesShortFilmToggle={moviesShortFilmToggle}
                    moviesQuery={moviesQuery}
                    setMoviesQuery={setMoviesQuery}
                />
                {moviesComponent}
            </div>
            <Footer />
        </>
    )
}

export default Movies;