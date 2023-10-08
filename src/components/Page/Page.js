import './Page.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import NavTab from '../NavTab/NavTab';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Portfolio from '../Portfolio/Portfolio';



function Page() {
    return (
        <>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </>
    );
}

export default Page;