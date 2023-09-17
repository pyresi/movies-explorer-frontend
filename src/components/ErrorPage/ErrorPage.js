import './ErrorPage.css';
import './ErrorPage__header.css';
import './ErrorPage__paragraph.css';
import './ErrorPage__link.css';

function ErrorPage() {
    return (
        <div className="errorpage">
            <h1 className='errorpage__header'>404</h1>
            <p className='errorpage__paragraph'>Страница не найдена</p>
            <a className='errorpage__link'>Назад</a>
        </div>
    )

}

export default ErrorPage;