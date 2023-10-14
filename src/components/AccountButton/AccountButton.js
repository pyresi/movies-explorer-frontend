import { Link } from "react-router-dom";
import './AccountButton.css';

function AccountButton({ onClick }) {
    return (<Link className='account-button' to='/profile' onClick={onClick}>Аккаунт</Link>);
}

export default AccountButton;