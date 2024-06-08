import css from './AddNewProduct.module.css';
import Icon from '../../Icon';
import { useState } from 'react';
import Modal from '../../Modal/Modal';
import AddNewProductModal from '../EditModalProduct/AddNewProductModal';

const AddNewProduct = () => {
  const [isOpenModal, setOpenModal] = useState(false);

  const closeAddModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <button className={css.btn} onClick={() => setOpenModal(true)}>
        <div className={css.icon}>
          <Icon name="add" width={20} height={20} />
        </div>
        Add a new product
      </button>

      {isOpenModal && (
        <Modal onClose={closeAddModal} title="Add a new product">
          <AddNewProductModal onClose={closeAddModal} />
        </Modal>
      )}
    </>
  );
};

export default AddNewProduct;
