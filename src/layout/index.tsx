import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Header from '../components/layout/Header'
import { StoreProvider } from '../store'
import routes from '../config/routes'

import './styles.scss'

export default function Layout() {
    return (
        <div id="investree-main">
            <StoreProvider>
                <div className="wrapper">
                    <Header />
                    <BrowserRouter>
                        <Switch>
                            {routes.map((route, index) => {
                                return route.component &&
                                    <Route 
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.component}
                                    />
                            })}
                            <Redirect exact to="/error"/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </StoreProvider>
        </div>
    )
}
