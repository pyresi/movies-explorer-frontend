import './Footer.css';
import './Footer__paragraph.css';
import './Footer__box.css';
import './Footer__box-element.css';
import './Footer__links.css';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__paragraph">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__box">
                <p className="footer__box-element">© 2023</p>
                <div className='footer__links'>
                    <p className="footer__box-element">Яндекс.Практикум</p>
                    <p className="footer__box-element">GitHub</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;