import MoviesCardList from "../MoviesCardList/MoviesCardList";
import '../Movies/Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import { useEffect } from "react";

function SavedMovies({
    savedMovies,
    savedMoviesShortFilmToggle,
    setSavedMoviesShortFilmToggle,
    handleLikeClick,
    moviesToShow,
    totalMoviesToShow,
    queryMovies,
    isSavedMoviesLoading
}) {

    let moviesComponent = <MoviesCardList
        isSaved={true}
        isLoading={isSavedMoviesLoading}
        handleLikeClick={handleLikeClick}
        moviesToShow={moviesToShow}
        savedMovies={savedMovies}
        totalMoviesToShow={totalMoviesToShow}
    />;

    useEffect(() => {
        console.log('saved-movies!!!');
        queryMovies('');
    }, []);

    return (
        <>
            <div className="movies">
                <SearchForm
                    setMoviesShortFilmToggle={setSavedMoviesShortFilmToggle}
                    queryMovies={queryMovies}
                    moviesShortFilmToggle={savedMoviesShortFilmToggle}
                />
                {moviesComponent}
            </div>
            <Footer />
        </>

    )
}

export default SavedMovies;