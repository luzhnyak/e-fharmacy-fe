import css from "./FilterForm.module.css";

import { useForm } from "react-hook-form";

import Icon from "../Icon";
import { FC } from "react";

interface IForms {
  name: string;
}

interface IProps {
  setSearchQuery: (value: string) => void;
  placeholder: string;
}

const FilterForm: FC<IProps> = ({ setSearchQuery, placeholder }) => {
  const { register, handleSubmit } = useForm<IForms>();
  const onSubmit = (data: IForms) => {
    setSearchQuery(data.name);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={css.wrap}>
        <input
          {...register("name")}
          className={css.input}
          placeholder={placeholder}
        />

        <button type="submit" className={css.button}>
          <div className={css.icon}>
            <Icon name="filter" width={14} height={14} />
          </div>
          Filter
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
