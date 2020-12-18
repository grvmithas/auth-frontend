import React, {Suspense,lazy} from 'react'
import {BrowserRouter as Router,Switch,Route, Link,} from 'react-router-dom'

const SignInScreen = lazy(()=>import('../screens/auth/Signin'))
const SignUpScreen = lazy(()=>import('../screens/auth/Signup'))
const HomeScreen=lazy(()=>import('../screens/home/Home'))

const routes = [
  {
    path:'/signin',
    component:SignInScreen,
    name:'SignIn',
  },
  {
    path:'/signUp',
    component:SignUpScreen,
    name:'SignUp',
  }, {
    path: '/home',
    component: HomeScreen,
    name:'Home',
  },

]

export  function RouteConfig() {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <Router>
        <Switch>
          <Route
            key={'root'}
            path={'/'}
            component={SignInScreen}
          /> 
          {routes.map((route) => (
            <Route
              key={route.path.split('/')[1]}
              path={route.path}
              component={route.component}
            /> 
          ))}
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  )
}

export default RouteConfig

function NoMatch() {
  return (
    <div>
      <h3>
        Invalid link... go to <Link to={'/signin'}>Signin</Link>
      </h3>
    </div>
  )
}
