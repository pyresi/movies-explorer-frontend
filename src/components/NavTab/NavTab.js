import './NavTab.css';
import './NavTab__link.css';
import './NavTab__element.css';

function NavTab() {
    return (
        <nav>
            <ul className="navtab">
                <li className='navtab__element'><a href="#" className='navtab__link'>О проекте</a></li>
                <li className='navtab__element'><a href="#" className='navtab__link'>Технологии</a></li>
                <li className='navtab__element'><a href="#" className='navtab__link'>Студент</a></li>
            </ul>
        </nav>
    );
}

export default NavTab;