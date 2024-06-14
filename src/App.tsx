import { Navigate, Route, Routes } from 'react-router-dom';
import { SharedLayout } from './components/SharedLayout/SharedLayout';
import { lazy } from 'react';

import { RestrictedRoute } from './pages/RestrictedRoute';
import { PrivateRoute } from './pages/PrivateRoute';
import LoginPage from './pages/LoginPage/LoginPage';

const AllProductsPage = lazy(
  () => import('./pages/AllProductsPage/AllProductsPage')
);
const DasboardPage = lazy(() => import('./pages/DasboardPage/DasboardPage'));
const AllOrdersPage = lazy(() => import('./pages/AllOrdersPage/AllOrdersPage'));
const AllSuppliersPage = lazy(
  () => import('./pages/AllSuppliersPage/AllSuppliersPage')
);
const CustomersDataPage = lazy(
  () => import('./pages/CustomersDataPage/CustomersDataPage')
);

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<RestrictedRoute component={<LoginPage />} redirectTo="/" />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute component={<SharedLayout />} redirectTo="/login" />
          }
        >
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DasboardPage />} />
          <Route path="orders" element={<AllOrdersPage />} />
          <Route path="products" element={<AllProductsPage />} />
          <Route path="suppliers" element={<AllSuppliersPage />} />
          <Route path="customers" element={<CustomersDataPage />} />
          <Route path="*" element={<DasboardPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
