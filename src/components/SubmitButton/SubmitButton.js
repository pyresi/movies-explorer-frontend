import { useEffect } from 'react';
import './SubmitButton.css';

function SubmitButton({ isValid, buttonText, errorMsg }) {
    useEffect(() => {
        console.log(errorMsg);
    }, [errorMsg]);

    return <>
        <div className='submit-button__container'>
            <p
                className={'submit-button__error-message' + (errorMsg !== '' ? ' submit-button__error-message_active' : '')}>
                {errorMsg}
            </p>
            <button type='submit' className={'submit-button'} disabled={!isValid}>{buttonText}</button>
        </div>
    </>;
}

export default SubmitButton;