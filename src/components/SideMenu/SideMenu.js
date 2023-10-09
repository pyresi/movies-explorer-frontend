import { Link, useLocation } from "react-router-dom";
import AccountButton from "../AccountButton/AccountButton";
import { useContext } from "react";
import { AppContext } from "../../contexts/CurrentAppContext";
import './SideMenu.css';

function SideMenu() {
    const location = useLocation();
    const { isSideMenuActive, setIsSideMenuActive } = useContext(AppContext);

    function closeSideMenu() {
        setIsSideMenuActive(false);
    }
    return (
        <div className={"sidemenu" + (isSideMenuActive ? ' sidemenu_active' : '')}>
            <div className="sidemenu__container">
                <button type="button" className="sidemenu__close-btn" onClick={closeSideMenu} />
                <ul className="sidemenu__navigation-list">
                    <li
                        className="sidemenu__navigation-list-element">
                        <Link to='/'
                            className={'sidemenu__navigation-list-element-link' + (location.pathname === '/' ? ' sidemenu__navigation-list-element-link_active' : '')}>
                            Главная
                        </Link>
                    </li>
                    <li
                        className="sidemenu__navigation-list-element">
                        <Link
                            to="/movies"
                            className={'sidemenu__navigation-list-element-link' + (location.pathname === '/movies' ? ' sidemenu__navigation-list-element-link_active' : '')}>
                            Фильмы
                        </Link>
                    </li>
                    <li
                        className="sidemenu__navigation-list-element">
                        <Link className={'sidemenu__navigation-list-element-link' + (location.pathname === '/saved-movies' ? ' sidemenu__navigation-list-element-link_active' : '')}
                            to="/saved-movies">
                            Сохранёные фильмы
                        </Link>
                    </li>
                </ul>
                <AccountButton />
            </div>

        </div>
    );
}

export default SideMenu;