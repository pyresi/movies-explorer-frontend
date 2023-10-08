import './Footer.css';
import './Footer__paragraph.css';
import './Footer__box.css';
import './Footer__box-element.css';
import './Footer__links.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__paragraph">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__box">
                <p className="footer__box-element">© 2023</p>
                <nav className='footer__links'>
                    <Link className="footer__box-element" to={'https://practicum.yandex.ru/'}>Яндекс.Практикум</Link>
                    <Link className="footer__box-element" to={'https://github.com/'}>GitHub</Link>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;