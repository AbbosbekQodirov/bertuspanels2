export const setToken = (token) => {    
  window.localStorage.setItem("bertus_acces_token", token);
};
export const getToken = () => {
  return window.localStorage.getItem("bertus_acces_token");
};


export const setRole = (role) => {
  window.localStorage.setItem("bertus_role", role);
};
export const getRole = () => {
  return window.localStorage.getItem("bertus_role");
};
