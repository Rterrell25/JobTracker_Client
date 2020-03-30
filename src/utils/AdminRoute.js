import React from 'react'
import { Route, Redirect } from 'react-router-dom'
const AdminRoute = ({ component: Component, isAuth, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuth && user && user.user.admin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}

export default AdminRoute
