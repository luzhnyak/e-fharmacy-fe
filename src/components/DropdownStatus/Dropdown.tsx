import React, { FC, LegacyRef, RefObject, useRef } from "react";
import css from "./Dropdown.module.css";
import useCloseDropdown from "../../services/closeDropdown";

interface IProps {
  onSelect: (value: string) => void;
  onClose: (value: boolean) => void;
  ref: LegacyRef<HTMLDivElement>;
}

const Dropdown: FC<IProps> = React.forwardRef(({ onSelect, onClose }, ref) => {
  const handleClick = (selectedCategory: string) => {
    onSelect(selectedCategory);
  };

  const status = ["Active", "Deactive"];

  const inputRef = useRef(null);

  useCloseDropdown(onClose, inputRef, ref as RefObject<HTMLDivElement>);

  return (
    <div className={css.dropDown} ref={inputRef}>
      <ul className={css.list}>
        {status.map((stat) => (
          <li key={stat} onClick={() => handleClick(stat)} className={css.stat}>
            {stat}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Dropdown;
