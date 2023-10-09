import './AboutMe.css';
import './AboutMe__name.css';
import './AboutMe__bio.css';
import './AboutMe__description.css';
import './AboutMe__description-box.css';
import './AboutMe__box.css';
import './AboutMe__portrait.css';
import './AboutMe__github.css';
import portrait from '../../images/portrait-min.png';
import SectionHeader from '../SectionHeader/SectionHeader';
import { Link } from 'react-router-dom';

function AboutMe() {
    return (
        <div className="aboutme" id='about-me'>
            <SectionHeader headerText='Студент' />
            <div className='aboutme__box'>
                <div className='aboutme__description-box'>
                    <h2 className='aboutme__name'>Анастасия</h2>
                    <p className='aboutme__bio'>Фронтенд-разработчик, 25 лет</p>

                    <p className='aboutme__description'>Закончила РУДН по специальности лингвистика, работала переводчиком пока не прошла курс по веб-разработке. Сейчас живу в Москве. В свободное время занимаюсь волонтерством и спортом.</p>
                    <Link className='aboutme__github' to='https://github.com/pyresi' target="_blank">GitHub</Link>
                </div>
                <img src={portrait} alt="Портретная фотография студента" className='aboutme__portrait' />
            </div>
        </div >
    );
}

export default AboutMe;