import React, { useState } from 'react';
import css from './AllSuppliersPage.module.css';
import FilterForm from '../../components/FilterForm/FilterForm';
import AddNewSupplier from '../../components/Suppliers/AddNewSupplier/AddNewSupplier';
import AllSuppliersTable from '../../components/Suppliers/AllSuppliersTable/AllSuppliersTable';

const AllSuppliersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className={css.container}>
      <div className={css.wrap}>
        <FilterForm setSearchQuery={setSearchQuery} placeholder="User Name" />
        <AddNewSupplier />
      </div>
      <AllSuppliersTable searchQuery={searchQuery} />
    </section>
  );
};

export default AllSuppliersPage;
