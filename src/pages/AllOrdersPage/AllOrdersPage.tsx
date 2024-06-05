import { useState } from 'react';
import css from './AllOrdersPage.module.css';
import FilterForm from '../../components/FilterForm/FilterForm';
import AllOrdersTable from '../../components/AllOrders/AllOrdersTable';

const AllOrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className={css.container}>
      <FilterForm setSearchQuery={setSearchQuery} placeholder="User name" />
      <AllOrdersTable searchQuery={searchQuery} />
    </section>
  );
};

export default AllOrdersPage;
