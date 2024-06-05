import React, { useState } from 'react';
import css from './CustomersDataPage.module.css';
import FilterForm from '../../components/FilterForm/FilterForm';
import AllCustomersTable from '../../components/Customers/AllCustomersTable';

const CustomersDataPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className={css.container}>
      <FilterForm setSearchQuery={setSearchQuery} placeholder="User name" />
      <AllCustomersTable searchQuery={searchQuery} />
    </section>
  );
};

export default CustomersDataPage;
