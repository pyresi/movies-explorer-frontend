import SectionHeader from "../SectionHeader/SectionHeader";
import './Portfolio.css';
import './Portfolio__links.css';
import './Portfolio__link-arrow.css';
import './Portfolio__link.css';
import './Portfolio__link-container.css'
import { Link } from "react-router-dom";

function Portfolio() {
    return (<section className="portfolio">
        <SectionHeader headerText={'Портфолио'} isSubHeader={true} />
        <ul className='portfolio__links'>
            <li className='portfolio__link-container'>
                <Link className='portfolio__link' to='https://github.com/pyresi/how-to-learn' target="_blank">Статичный сайт</Link>
                <Link className='portfolio__link-arrow' to='https://github.com/pyresi/how-to-learn' target="_blank"></Link>
            </li>
            <li className='portfolio__link-container'>
                <Link className='portfolio__link' to='https://github.com/pyresi/russian-travel' target="_blank">Адаптивный сайт</Link>
                <Link className='portfolio__link-arrow' to='https://github.com/pyresi/russian-travel' target="_blank"></Link>
            </li>
            <li className='portfolio__link-container'>
                <Link className='portfolio__link' to='https://github.com/pyresi/react-mesto-api-full-gha' target="_blank">Одностраничное приложение</Link>
                <Link className='portfolio__link-arrow' to='https://github.com/pyresi/react-mesto-api-full-gha' target="_blank"></Link>
            </li>
        </ul>
    </section>);
}

export default Portfolio;