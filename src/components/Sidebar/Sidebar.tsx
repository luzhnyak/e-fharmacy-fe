import { FC } from "react";
import Icon from "../Icon";
import css from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

const Sidebar: FC<IProps> = ({ onClose, isOpen }) => {
  const handleLogOut = () => {};

  return (
    <div className={`${css.sidebar} ${isOpen ? "" : css.hideBackdrop}`}>
      <nav className={css.navigation}>
        <div onClick={onClose} className={css.icon}>
          <Icon name="close" width={32} height={32} />
        </div>

        <ul className={css.list}>
          <li className={css.wraplink}>
            <NavLink to="/dashboard" className={css.link}>
              <Icon name="dashboard" width={12} height={12} />
            </NavLink>
          </li>

          <li className={css.wraplink}>
            <NavLink to="/orders" className={css.link}>
              <Icon name="busket" width={13} height={13} />
            </NavLink>
          </li>

          <li className={css.wraplink}>
            <NavLink to="/products" className={css.link}>
              <Icon name="bottle" width={12} height={13} />
            </NavLink>
          </li>

          <li className={css.wraplink}>
            <NavLink to="/suppliers" className={css.link}>
              <Icon name="bag" width={12} height={13} />
            </NavLink>
          </li>

          <li className={css.wraplink}>
            <NavLink to="/customers" className={css.link}>
              <Icon name="users" width={13} height={10} />
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={css.iconLogout} onClick={handleLogOut}>
        <Icon name="phone" width={13} height={14} />
      </div>
    </div>
  );
};

export default Sidebar;
