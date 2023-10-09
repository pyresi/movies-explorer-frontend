import './AboutProject.css';
import '../SectionHeader/SectionHeader.js'
import './AboutProject__sub-header.css';
import './AboutProject__paragraph.css';
import './AboutProject__columns.css';
import './AboutProject__line.css';
import './AboutProject__timeline.css';
import './AboutProject__timeline-bar.css';
import './AboutProject__timeline-bar_type_backend.css';
import './AboutProject__timeline-bar_type_frontend.css';
import './AboutProject__timeline-bar_type_description.css';
import SectionHeader from '../SectionHeader/SectionHeader.js';

function AboutProject() {
    return (
        <div className='aboutproject' id='about-project'>
            <SectionHeader headerText='О проекте' />
            <div className='aboutproject__columns'>
                <div className='aboutproject__column'>
                    <h3 className='aboutproject__sub-header'>Дипломный проект включал 5 этапов</h3>
                    <p className='aboutproject__paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='aboutproject__column'>
                    <h3 className='aboutproject__sub-header'>На выполнение диплома ушло 5 недель</h3>
                    <p className='aboutproject__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='aboutproject__timeline'>
                <div className='aboutproject__timeline-bar aboutproject__timeline-bar_type_backend'>1 неделя</div>
                <div className='aboutproject__timeline-bar aboutproject__timeline-bar_type_frontend'>4 недели</div>
                <div className='aboutproject__timeline-bar aboutproject__timeline-bar_type_description'>Back-end</div>
                <div className='aboutproject__timeline-bar aboutproject__timeline-bar_type_description'>Front-end</div>
            </div>

        </div>
    );
}

export default AboutProject;