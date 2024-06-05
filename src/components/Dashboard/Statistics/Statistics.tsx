import Icon from '../../Icon';
import css from './Statistics.module.css';

import { useGetProductsQuery } from '../../../redux/products/productsApi';
import { useGetSuppliersQuery } from '../../../redux/dashboard/suppliersApi';
import { useGetCustomersQuery } from '../../../redux/dashboard/customersApi';

const Statistics = () => {
  const { data: products } = useGetProductsQuery();
  const { data: suppliers } = useGetSuppliersQuery();
  const { data: customers } = useGetCustomersQuery();

  return (
    <div className={css.cells}>
      <div className={css.border}>
        <div className={css.wrapText}>
          <Icon name="coins" />
          <p className={css.text}>All products</p>
        </div>
        <p className={css.number}>{products?.data.length || 0}</p>
      </div>

      <div className={css.border}>
        <div className={css.wrapText}>
          <Icon name="customers" />
          <p className={css.text}>All suppliers</p>
        </div>
        <p className={css.number}>{suppliers?.data.length || 0}</p>
      </div>

      <div className={css.border}>
        <div className={css.wrapText}>
          <Icon name="customers" />
          <p className={css.text}>All customers</p>
        </div>
        <p className={css.number}>{customers?.data.length || 0}</p>
      </div>
    </div>
  );
};

export default Statistics;
