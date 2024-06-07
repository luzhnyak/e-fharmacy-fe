import { useState, useEffect } from 'react';
import css from './ScrollToTopButton.module.css';
import Icon from '../Icon';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`${css.scroll} ${isVisible ? css.visible : ''}`}
      onClick={scrollToTop}
    >
      <Icon name="chevron-up" />
    </div>
  );
};

export default ScrollToTopButton;
