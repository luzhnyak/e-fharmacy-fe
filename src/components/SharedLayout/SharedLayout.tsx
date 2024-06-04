import { Outlet } from "react-router-dom";
import { Suspense, useState } from "react";
import { ToastContainer } from "react-toastify";

import Header from "../Header/Header";
import Loader from "../Loader/Loader";

import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import Sidebar from "../Sidebar/Sidebar";

import css from "./SharedLayout.module.css";

export const SharedLayout = () => {
  const [isOpenMenu, setOpenMenu] = useState(false);

  return (
    <div>
      <Header onOpen={setOpenMenu} />
      <Sidebar onClose={() => setOpenMenu(false)} isOpen={isOpenMenu} />
      {isOpenMenu && (
        <div className={css.backdrop} onClick={() => setOpenMenu(false)}>
          <Sidebar onClose={() => setOpenMenu(false)} isOpen={isOpenMenu} />
        </div>
      )}
      <ScrollToTopButton />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />
      <main>
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
