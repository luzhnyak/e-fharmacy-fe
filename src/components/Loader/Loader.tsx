import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <ThreeDots
      visible={true}
      height={100}
      width={100}
      color="rgb(52, 112, 255)"
      radius="10"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        left: '50%',
        top: '50%',
        position: 'absolute',
      }}
      wrapperClass="modal-wrapper"
    />
  );
};

export default Loader;
