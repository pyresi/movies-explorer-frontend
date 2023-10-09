import { Link } from "react-router-dom";
import './AccountButton.css';

function AccountButton() {
    return (<Link className='account-button' to='/profile'>Аккаунт</Link>);
}

export default AccountButton;