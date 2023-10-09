import './ErrorPage.css';
import './ErrorPage__header.css';
import './ErrorPage__paragraph.css';
import './ErrorPage__link.css';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
    const navigate = useNavigate();
    function goBack() {
        navigate(-1);
    }
    return (
        <div className="errorpage">
            <h1 className='errorpage__header'>404</h1>
            <p className='errorpage__paragraph'>Страница не найдена</p>
            <button className='errorpage__btn' onClick={goBack}>Назад</button>
        </div>
    )

}

export default ErrorPage;