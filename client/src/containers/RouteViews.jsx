import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import DashHomePage from '../pages/Dashboard/DashHomePage'
const RouteViews = () => {
    return <main>
        <Switch>
            <Route
                exact
                path="/"
                render={() => <HomePage />}
            />
            <Route
                exact
                path="/dashboard"
                render={() => <DashHomePage />}
            />
        </Switch>
    </main>
}

// export default withRouter(connect(store => ({}), {})(RouteViews))
// export default withRouter(RouteViews)
export default withRouter(connect((store) => ({ auth: store.auth }), {})(RouteViews));
