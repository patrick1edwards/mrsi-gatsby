import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from 'containers/notfound'
import Home from 'containers/home'
import Login from 'containers/login'
import Users from 'containers/users'
import Projects from 'containers/projects'
import Document from 'containers/document'
import CONSTANTS from '../constants'

/**
 * Defines components to routes mapping.
 *
 * Everytime a new view is created, entry is required here to map the component to a specific route.
 *
 * [IMPORTANT]
 * All route entries are required to be done before the notFound component.
 *
 * @returns {XML}
 */
export default () => {
  return (
    <Switch>
      <Route exact path={CONSTANTS.HOME} component={Home} />
      <Route exact path={CONSTANTS.LOGIN} component={Login} />
      <Route exact path={CONSTANTS.PROJECTS} component={Projects} />
      <Route exact path={CONSTANTS.USERS} component={Users} />
      <Route exact path={CONSTANTS.PROJECTS + '/:id'} component={Document} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}
