import './Techs.css';
import './Techs__header.css';
import './Techs__paragraph.css';
import './Techs__list.css';
import './Techs__list-element.css';
import './Techs__container.css';
import SectionHeader from '../SectionHeader/SectionHeader';

function Techs() {
    return (
        <section className='techs' id='techs'>
            <div className='techs__container'>
                <SectionHeader headerText='Технологии' />
                <h2 className='techs__header'>7 технологий</h2>
                <p className='techs__paragraph'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <div className='techs__list'>
                    <div className='techs__list-element'>HTML</div>
                    <div className='techs__list-element'>CSS</div>
                    <div className='techs__list-element'>JS</div>
                    <div className='techs__list-element'>React</div>
                    <div className='techs__list-element'>Git</div>
                    <div className='techs__list-element'>Express.js</div>
                    <div className='techs__list-element'>mongoDB</div>
                </div>
            </div>

        </section>
    );
}

export default Techs;