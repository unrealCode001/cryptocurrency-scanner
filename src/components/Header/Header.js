import './Header.scss';
import logo from '../../assets/logo.svg';

const Header = () => {
    return ( 
        <header className='header'>
            <img className='header__logo' src={logo} alt='equisoft logo'/>
            <h1 className='header__title'>CRYPTOSOFT</h1>
        </header>
     );
}
 
export default Header;