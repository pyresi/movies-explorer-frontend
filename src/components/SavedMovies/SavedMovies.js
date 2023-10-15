import MoviesCardList from "../MoviesCardList/MoviesCardList";
import '../Movies/Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

function SavedMovies({
    savedMovies,
    savedMoviesShortFilmToggle,
    setSavedMoviesShortFilmToggle,
    handleLikeClick,
    moviesToShow,
    savedMoviesMoreBtnClickedTimes,
    setSavedMoviesMoreBtnClickedTimes,
    maxMoviesToShow,
    totalMoviesToShow
}) {


    let moviesComponent = <MoviesCardList
        isSaved={true}
        handleLikeClick={handleLikeClick}
        moviesToShow={moviesToShow}
        savedMovies={savedMovies}
        maxMoviesToShow={maxMoviesToShow}
        moreBtnClickTimes={savedMoviesMoreBtnClickedTimes}
        setMoreBtnClickTimes={setSavedMoviesMoreBtnClickedTimes}
        totalMoviesToShow={totalMoviesToShow}
    />;

    return (
        <>
            <div className="movies">
                <SearchForm
                    setMoviesShortFilmToggle={setSavedMoviesShortFilmToggle}
                    // queryMovies={queryMovies}
                    moviesShortFilmToggle={savedMoviesShortFilmToggle}
                // moviesQuery={moviesQuery}
                // setMoviesQuery={setMoviesQuery}
                />
                {moviesComponent}
            </div>
            <Footer />
        </>

    )
}

export default SavedMovies;