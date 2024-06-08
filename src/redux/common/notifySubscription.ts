interface INotifySubscription {
  [key: string]: {
    [key: string]: {
      loader: boolean;
      success: boolean | string;
      error: boolean | string;
    };
  };
}

export const notifySubscription: INotifySubscription = Object.freeze({
  productsApi: {
    getProducts: { loader: true, success: false, error: true },
    getProductById: { loader: true, success: false, error: true },
    createProduct: { loader: true, success: true, error: true },
    updateProduct: { loader: true, success: true, error: true },
    deleteProduct: { loader: true, success: true, error: true },
  },

  suppliersApi: {
    getSuppliers: { loader: true, success: false, error: true },
    createSupplier: { loader: true, success: true, error: true },
    updateSupplier: { loader: true, success: true, error: true },
  },

  ordersApi: {
    getOrders: { loader: true, success: false, error: true },
  },

  incomeExpensesApi: {
    getincomeExpenses: { loader: true, success: false, error: true },
  },

  customersApi: {
    getCustomers: { loader: true, success: false, error: true },
  },

  authApi: {
    login: { loader: false, success: false, error: true },
    logout: { loader: true, success: false, error: true },
    refreshUser: { loader: false, success: false, error: false },
  },
});
