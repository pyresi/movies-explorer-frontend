import './NavTab.css';
import './NavTab__link.css';
import './NavTab__element.css';
import './NavTab__links.css'

function NavTab() {
    return (
        <nav className='navtab'>
            <ul className="navtab__links">
                <li className='navtab__element'><a href="#" className='navtab__link'>О проекте</a></li>
                <li className='navtab__element'><a href="#" className='navtab__link'>Технологии</a></li>
                <li className='navtab__element'><a href="#" className='navtab__link'>Студент</a></li>
            </ul>
        </nav>
    );
}

export default NavTab;