import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import decode from 'jwt-decode'

import RouteViews from "./RouteViews";
import { store } from '../store'
import { setCurrentUser, addError, setToken } from '../store/actions'

if (localStorage.jwtToken) {
    setToken(localStorage.jwtToken)
    try {
        store.dispatch(setCurrentUser(decode(localStorage.jwtToken)))
        console.log("hey")
    } catch (err) {
        store.dispatch(setCurrentUser({}))
        store.dispatch(addError(err))
    }
}
const App = () => {
    return <Provider store={store}>
        <Router>
            {/* <NavBar /> */}
            <RouteViews />
        </Router>
    </Provider>
}

export default App;