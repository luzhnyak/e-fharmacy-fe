import React from "react";
import css from "./DasboardPage.module.css";
import Statistics from "../../components/Dashboard/Statistics/Statistics";
import RecentCustomers from "../../components/Dashboard/RecentCustomers/RecentCustomers";
import IncomeExpenses from "../../components/Dashboard/IncomeExpenses/IncomeExpenses";

const DasboardPage = () => {
  return (
    <section className={css.container}>
      <Statistics />
      <div className={css.tables}>
        <RecentCustomers />
        <IncomeExpenses />
      </div>
    </section>
  );
};

export default DasboardPage;
