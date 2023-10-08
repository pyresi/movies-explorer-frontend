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

function MoviesCard({ isSavedCard = false }) {
    const [isLiked, setIsLiked] = useState(false);

    function handleLikeClick() {
        setIsLiked(!isLiked);
    }

    return (
        <div className='moviescard'>
            <img className='moviescard__img' src={Scene} alt='Сцена из фильма'></img>
            <div className='moviescard__description'>
                <p className='moviescard__description-paragraph'>33 слова о дизайне</p>
                <p className='moviescard__description-duration'>1ч42м</p>
                {isSavedCard
                    ? <button className={'moviescard__description-delete'} onClick={handleLikeClick} />
                    : <button className={'moviescard__description-like' + (isLiked ? ' moviescard__description-like_type_active' : '')} onClick={handleLikeClick} />
                }

            </div>
        </div>
    )
}

export default MoviesCard;