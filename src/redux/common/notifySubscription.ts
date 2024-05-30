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
  usersApi: {
    getUsers: { loader: true, success: false, error: true },
    addUser: { loader: true, success: true, error: true },
    updateUser: { loader: true, success: true, error: true },
    deleteUser: { loader: true, success: true, error: true },
  },

  testsApi: {
    getProducts: { loader: true, success: false, error: true },
    getProductById: { loader: true, success: false, error: true },
    getProductByTaskId: { loader: true, success: false, error: true },
    createProduct: { loader: true, success: true, error: true },
    updateProduct: { loader: true, success: true, error: true },
    deleteProduct: { loader: true, success: true, error: true },
  },

  authApi: {
    register: { loader: false, success: false, error: true },
    importUsers: { loader: false, success: false, error: true },
    login: { loader: false, success: false, error: true },
    logout: { loader: false, success: false, error: true },
    restoreUser: { loader: false, success: false, error: false },
    refreshUser: { loader: false, success: false, error: false },
    changePassword: { loader: false, success: false, error: true },
    resetPassword: { loader: false, success: false, error: true },
    recoverCredentials: { loader: false, success: true, error: true },
    createPassword: { loader: false, success: false, error: true },
  },

  notificationsApi: {
    getNotifications: { loader: false, success: false, error: true },
  },
});
