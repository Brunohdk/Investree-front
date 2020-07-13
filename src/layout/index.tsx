import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Header from '../components/layout/Header'
import { StoreProvider } from '../store'
import routes from '../config/routes'

import './styles.scss'

export default function Layout() {
    return (
        <div id="investree-layout">
            <StoreProvider>
                <div className="wrapper-layout">
                    <Header />
                    <div className="content-container-layout">
                        <div className="card-layout">
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
                        </div>
                    </div>
                </div>
            </StoreProvider>
        </div>
    )
}
