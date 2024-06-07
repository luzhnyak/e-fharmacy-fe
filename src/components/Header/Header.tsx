import { Link, useLocation } from 'react-router-dom';
import css from './Header.module.css';
import LogoAuthImage from '../../img/logoAuth.png';
import Icon from '../Icon';
import { FC } from 'react';

interface IProps {
  onOpen: (value: boolean) => void;
}

const Header: FC<IProps> = ({ onOpen }) => {
  const handleLogOut = () => {
    // dispatch(logOutThunk() as any);
  };

  const location = useLocation();

  const formattedPathname =
    location.pathname === '/dashboard'
      ? location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2)
      : `All ` + location.pathname.slice(1);

  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <div onClick={() => onOpen(true)} className={css.icon}>
          <Icon name="menu-burger" width={32} height={32} />
        </div>
        <Link to="/" className={css.logo}>
          <img src={LogoAuthImage} alt="logo" />
        </Link>
        <div className={css.wrapText}>
          <Link to="/">
            <p className={css.logoTitle}>Medicine store</p>
          </Link>
          <div className={css.subTitle}>
            <Link to={location.pathname} className={css.pathname}>
              {formattedPathname}
            </Link>
            <span className={css.stroke}></span>
            <p className={css.email}>vendor@gmail.com</p>
            {/* <p className={css.email}>{currentUser.email}</p> */}
          </div>
        </div>
      </nav>
      <div className={css.iconLogout} onClick={handleLogOut}>
        <Icon name="phone" width={13} height={14} />
      </div>
    </header>
  );
};

export default Header;
