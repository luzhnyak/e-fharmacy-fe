import css from "./AddNewSupplier.module.css";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import AddNewSupplierModal from "../AddNewSupplierModal/AddNewSupplierModal";

const AddNewSupplier = () => {
  const [isOpenModal, setOpenModal] = useState(false);

  const closeAddModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <button className={css.button} onClick={() => setOpenModal(true)}>
        Add a new suppliers
      </button>

      {isOpenModal && (
        <Modal onClose={closeAddModal} title="Add a new supplier">
          <AddNewSupplierModal onClose={closeAddModal} />
        </Modal>
      )}
    </>
  );
};

export default AddNewSupplier;
