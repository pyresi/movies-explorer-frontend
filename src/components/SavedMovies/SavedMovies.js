import MoviesCardList from "../MoviesCardList/MoviesCardList";
import '../Movies/Movies.css';
import '../Movies/Movies__more-btn.css';

function SavedMovies() {
    return (
        <div className="movies">
            <MoviesCardList></MoviesCardList>
            <button className='movies__more-btn'>
                Ещё
            </button>
        </div>

    )
}

export default SavedMovies;