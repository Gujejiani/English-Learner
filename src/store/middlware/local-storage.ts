// localStorageMiddleware.js
const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  localStorage.setItem('myAppReduxState', JSON.stringify(store.getState()));
  return result;
};

export default localStorageMiddleware;