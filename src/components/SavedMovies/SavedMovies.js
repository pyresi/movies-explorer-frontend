import MoviesCardList from "../MoviesCardList/MoviesCardList";
import '../Movies/Movies.css';
import '../Movies/Movies__more-btn.css';
import Preloader from '../Preloader/Preloader.js';
import Movies from "../Movies/Movies";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

function SavedMovies() {
    return (
        <>
            <div className="movies">
                <SearchForm></SearchForm>
                <Preloader></Preloader>
                {/* <MoviesCardList></MoviesCardList>
            <button className='movies__more-btn'>
                Ещё
            </button> */}
            </div>
            <Footer />
        </>

    )
}

export default SavedMovies;