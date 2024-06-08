import { DNA } from 'react-loader-spinner';
import css from './Loader.module.css';
import { createPortal } from 'react-dom';

const loaderRoot: Element | null = document.querySelector('#root-loader');

const Loader = () => {
  return (
    loaderRoot &&
    createPortal(
      <div className={css.backdrop}>
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{
            left: '50%',
            top: '50%',
            position: 'absolute',
          }}
          wrapperClass="modal-wrapper"
        />
      </div>,
      loaderRoot
    )
  );
};

export default Loader;
