import './NavTab.css';
import './NavTab__link.css';
import './NavTab__element.css';
import './NavTab__links.css'
import { Link } from 'react-router-dom';

function NavTab() {
    return (
        <nav className='navtab'>
            <ul className="navtab__links">
                <li className='navtab__element'><Link to={"/#about-project"} className='navtab__link'>О проекте</Link></li>
                <li className='navtab__element'><Link to="/#techs" className='navtab__link'>Технологии</Link></li>
                <li className='navtab__element'><Link to="/#about-me" className='navtab__link'>Студент</Link></li>
            </ul>
        </nav>
    );
}

export default NavTab;