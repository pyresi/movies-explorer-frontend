import Scene from '../../images/cover-min.png';
import './MoviesCard.css';
import './MoviesCard__description.css';
import './MoviesCard__description-paragraph.css';
import './MoviesCard__description-like.css';
import './MoviesCard__description-like_type_active.css';
import './MoviesCard__description-duration.css';
import './MoviesCard__img.css';
import './MoviesCard__description-delete.css';

import { useState } from 'react';

function MoviesCard({ name, duration, thumbnailURL, trailerLink, isSavedCard = false }) {
    const [isLiked, setIsLiked] = useState(false);

    function handleLikeClick() {
        setIsLiked(!isLiked);
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
        window.open(trailerLink);
    }

    return (
        <div className='moviescard'>
            <img className='moviescard__img' src={thumbnailURL} alt='Сцена из фильма' onClick={handleImgClick} />
            <div className='moviescard__description'>
                <p className='moviescard__description-paragraph'>{name}</p>
                <p className='moviescard__description-duration'>{minutesToStrDuration(duration)}</p>
                {isSavedCard
                    ? <button className={'moviescard__description-delete'} onClick={handleLikeClick} />
                    : <button className={'moviescard__description-like' + (isLiked ? ' moviescard__description-like_type_active' : '')} onClick={handleLikeClick} />
                }

            </div>
        </div>
    )
}

export default MoviesCard;