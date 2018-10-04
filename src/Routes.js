import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import AsyncComponent from './components/AsyncComponent';

const Home = AsyncComponent(() => import('./containers/Home'));
const Secured = AsyncComponent(() => import('./containers/Secured'));
const Unsecured = AsyncComponent(() => import('./containers/Unsecured'));
const AppLanding = AsyncComponent(() => import('./containers/AppLanding'));
const SignOut = AsyncComponent(() => import('./containers/SignOut'));
const Profile = AsyncComponent(() => import('./containers/Profile'));

const Module1 = AsyncComponent(() => import('./containers/Module1'));
const Module2 = AsyncComponent(() => import('./containers/Module2'));

const About = AsyncComponent(() => import('./containers/About'));
const Legal = AsyncComponent(() => import('./containers/Legal'));

const NotFound = AsyncComponent(() => import('./containers/NotFound'));

const Routes = childProps => (
  <Switch>
    <AppliedRoute exact path="/" component={Home} props={childProps} />
    <AppliedRoute exact path="/secured" component={Secured} props={childProps} />
    <AppliedRoute exact path="/unsecured" component={Unsecured} props={childProps} />
    <AppliedRoute exact path="/app" component={AppLanding} props={childProps} />
    <AppliedRoute exact path="/profile" component={Profile} props={childProps} />
    <AppliedRoute exact path="/sign_out" component={SignOut} props={childProps} />

    <AppliedRoute exact path="/module1" component={Module1} props={childProps} />
    <AppliedRoute exact path="/module2" component={Module2} props={childProps} />

    <AppliedRoute exact path="/about" component={About} props={childProps} />
    <AppliedRoute exact path="/legal" component={Legal} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
