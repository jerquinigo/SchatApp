export const Auth = {
    authenticateUser: token => localStorage.setItem("token", token),

    isUserAuthenticated: () => localStorage.getItem("token") !== null,

    deauthenticateUser: () => localStorage.removeItem("token"),
    
    getToken: () => localStorage.getItem("token")
  };
  


  
  //implicit returns