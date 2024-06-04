import React from "react";
import Icon from "../../Icon";
import css from "./Statistics.module.css";
import { products } from "../../../data/products";
import { suppliers } from "../../../data/suppliers";
import { customers } from "../../../data/customers";

const Statistics = () => {
  return (
    <div className={css.cells}>
      <div className={css.border}>
        <div className={css.wrapText}>
          <Icon name="coins" />
          <p className={css.text}>All products</p>
        </div>
        <p className={css.number}>{products.length}</p>
      </div>

      <div className={css.border}>
        <div className={css.wrapText}>
          <Icon name="customers" />
          <p className={css.text}>All suppliers</p>
        </div>
        <p className={css.number}>{suppliers.length}</p>
      </div>

      <div className={css.border}>
        <div className={css.wrapText}>
          <Icon name="customers" />
          <p className={css.text}>All customers</p>
        </div>
        <p className={css.number}>{customers.length}</p>
      </div>
    </div>
  );
};

export default Statistics;
