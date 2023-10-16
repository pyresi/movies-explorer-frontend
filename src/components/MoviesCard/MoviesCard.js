import './MoviesCard.css';
import './MoviesCard__description.css';
import './MoviesCard__description-paragraph.css';
import './MoviesCard__description-like.css';
import './MoviesCard__description-like_type_active.css';
import './MoviesCard__description-duration.css';
import './MoviesCard__img.css';
import './MoviesCard__description-delete.css';

import { useEffect, useState } from 'react';

function MoviesCard({
    movieData,
    isSavedCard = false,
    handleLikeClick,
    savedMovies
}) {
    const [isLiked, setIsLiked] = useState(false);

    function onLikeClick() {
        // setIsLiked(!isLiked);
        handleLikeClick(movieData);
    }

    function minutesToStrDuration(minutes) {
        if (minutes >= 60) {
            return `${Math.floor(minutes / 60)}ч${minutes % 60}м`;
        }
        else {
            return `${minutes}м`;
        }
    }

    function handleImgClick(e) {
        window.open(movieData.trailerLink);
    }

    useEffect(() => {
        if (savedMovies.map((x) => x.movieId).includes(movieData.movieId)) {
            setIsLiked(true);
        }
        else {
            setIsLiked(false);
        }
    }, [savedMovies, movieData.movieId]);

    return (
        <div className='moviescard'>
            <img className='moviescard__img' src={movieData.thumbnail} alt='Сцена из фильма' onClick={handleImgClick} />
            <div className='moviescard__description'>
                <div className='moviescard__description-box'>
                    <p className='moviescard__description-paragraph'>{movieData.nameRU}</p>
                    {isSavedCard
                        ? <button className={'moviescard__description-delete'} onClick={onLikeClick} />
                        : <button className={'moviescard__description-like' + (isLiked ? ' moviescard__description-like_type_active' : '')} onClick={onLikeClick} />
                    }
                </div>
                <p className='moviescard__description-duration'>{minutesToStrDuration(movieData.duration)}</p>
            </div>
        </div>
    )
}

export default MoviesCard;