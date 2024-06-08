import { Link } from 'react-router-dom';
import LogoImage from '../../img/logo.png';
import ImagePill375_1x from '../../img/pill_375_@1x.png';
import ImagePill375_2x from '../../img/pill_375_@2x.png';
import ImagePill768_1x from '../../img/pill_768_@1x.png';
import ImagePill768_2x from '../../img/pill_768_@2x.png';
import css from './LoginPage.module.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import { ToastContainer } from 'react-toastify';

const LoginPage = () => {
  return (
    <>
      <div className={css.container}>
        <header className={css.header}>
          <nav>
            <Link to="/" className={css.logo}>
              <img src={LogoImage} alt="logo" />
              E-Pharmacy
            </Link>
          </nav>
        </header>
        <div className={css.wrap}>
          <p className={css.text}>
            Your medication,
            <img
              srcSet={`${ImagePill375_1x} 95w, ${ImagePill375_2x} 190w, ${ImagePill768_1x} 179w, ${ImagePill768_2x} 358w`}
              sizes="(min-width: 768px) 179px, (min-width: 320px) 95px, 100vw"
              src={ImagePill375_1x}
              alt="white round pill"
              className={css.inlineImage}
              loading="lazy"
            />
            delivered Say goodbye to all{' '}
            <span className={css.span}>your healthcare</span> worries with us
          </p>
          <LoginForm />
        </div>
      </div>
      <div className={css.backgroundContainer}>
        <div className={css.background}></div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />
    </>
  );
};

export default LoginPage;
