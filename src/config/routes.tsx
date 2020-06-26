
//landing
import Landing from '../pages/landing'
//home
import Home from '../pages/home'
//error
import ErrorPage from '../pages/error'

const routes = [
    //landing
    {exact: true, path: '/landing', name: 'Landing Page', component: Landing},
    //home
    {exact: true, path: '/', name: 'Home', component: Home},
    //error
    {exact: true, path: '/error', name: 'Error', component: ErrorPage}
]

export default routes
