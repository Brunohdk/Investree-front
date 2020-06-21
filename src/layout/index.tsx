import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import routes from '../config/routes'

import './styles.scss'

export default function Layout() {
    return (
        <div id="investree-main">
            <div className="wrapper">
                <BrowserRouter>
                    {routes.map((route, index) => {

                        return route.component &&
                            <Route 
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.component}
                            />
                    })}
                    <Redirect exact to="/"/>
                </BrowserRouter>
            </div>
        </div>
    )
}
