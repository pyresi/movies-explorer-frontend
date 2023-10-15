import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';

function Movies({
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
    handleLikeClick,
    savedMovies,
    maxMoviesToShow,
    totalMoviesToShow
}) {
    let moviesComponent = <></>;
    if (wasSearched) {
        moviesComponent = <MoviesCardList
            isLoading={isLoading}
            handleLikeClick={handleLikeClick}
            moviesToShow={moviesToShow}
            isSaved={false}
            savedMovies={savedMovies}
            maxMoviesToShow={maxMoviesToShow}
            moreBtnClickTimes={moviesMoreBtnClickedTimes}
            setMoreBtnClickTimes={setMoviesMoreBtnClickedTimes}
            totalMoviesToShow={totalMoviesToShow}
        />;
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