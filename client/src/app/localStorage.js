export const getUserLocalStorage = () => {
  return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
};

export const setUserLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};
