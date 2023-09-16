import './AboutMe.css';
import './AboutMe__name.css';
import './AboutMe__bio.css';
import './AboutMe__description.css';
import './AboutMe__box.css';
import './AboutMe__portrait.css';
import './AboutMe__github.css';
import './AboutMe__portfolio.css';
import './AboutMe__link.css';
import './AboutMe__links.css';
import './AboutMe__link-container.css';
import './AboutMe__link-arrow.css';
import portrait from '../../images/portrait.png';

function AboutMe() {
    return (
        <div className="aboutme">
            <h2 className='aboutproject__header'>Студент</h2>
            <hr className='aboutproject__line'></hr>
            <div className='aboutme__box'>
                <h2 className='aboutme__name'>Анастасия</h2>
                <p className='aboutme__bio'>Фронтенд-разработчик, 25 лет</p>
                <p className='aboutme__description'>Закончила РУДН по специальности лингвистика, работала переводчиком пока не прошла курс по веб-разработке. Сейчас живу в Москве. В свободное время занимаюсь волонтерством и спортом.
                </p>
                <img src={portrait} alt="Портретная фотография студента" className='aboutme__portrait'></img>
                <a className='aboutme__github' href='#'>GitHub</a>
                <a className='aboutme__portfolio' href='#'>Портфолио</a>
                <ul className='aboutme__links'>
                    <li className='aboutme__link-container'>
                        <a className='aboutme__link' href='#'>Статичный сайт</a>
                        <button className='aboutme__link-arrow' type='button'></button>
                    </li>
                    <li className='aboutme__link-container'>
                        <a className='aboutme__link' href='#'>Адаптивный сайт</a>
                        <button className='aboutme__link-arrow' type='button'></button>
                    </li>
                    <li className='aboutme__link-container'>
                        <a className='aboutme__link' href='#'>Одностраничное приложение</a>
                        <button className='aboutme__link-arrow' type='button'></button>
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default AboutMe;