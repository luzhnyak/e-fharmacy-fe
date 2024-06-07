import { DNA } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
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
    </div>

    // <ThreeDots
    //   visible={true}
    //   height={100}
    //   width={100}
    //   color="rgb(52, 112, 255)"
    //   radius="10"
    //   ariaLabel="three-dots-loading"
    //   wrapperStyle={{
    //     left: '50%',
    //     top: '50%',
    //     position: 'absolute',
    //   }}
    //   wrapperClass="modal-wrapper"
    // />
  );
};

export default Loader;
