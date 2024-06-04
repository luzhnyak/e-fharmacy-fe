import { FC, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import useCloseModals from "../../services/closeModals";
import Icon from "../Icon";

const modalRoot: Element | null = document.querySelector("#root-modal");

interface IProps {
  onClose: (value: boolean) => void;
  children: ReactNode;
  title: string;
}

const Modal: FC<IProps> = ({ onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useCloseModals(onClose, modalRef);

  return (
    modalRoot &&
    createPortal(
      <div className={css.backdrop}>
        <div className={css.container}>
          <div
            className={css.modal}
            ref={modalRef}
            onClick={(event) => event.stopPropagation()}
          >
            <button className={css.btnClose} onClick={() => onClose(false)}>
              <Icon name="close" width={24} height={24} />
            </button>
            <div className={css.title}>{title}</div>
            <div>{children}</div>
          </div>
        </div>
      </div>,

      modalRoot
    )
  );
};

export default Modal;
