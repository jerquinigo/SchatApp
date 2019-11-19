import React from "react";
import { Route, Redirect } from "react-router-dom";
import {Auth} from "./Auth.js";

 export const PrivateRoute = ({ component: Component}) => (
  <Route
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Component {...props}  />
      ) : (
        <Redirect
          to={{
            pathname: "/user/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

// export default PrivateRoute;