import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import LoadingScreen from './modules/common/components/LoadingScreen';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import Layout from './modules/nav/component/Layout';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const UserListPage = lazy(() => import('./modules/users/pages/UserListPage'));

export const Routes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <Route path="/">
          <Layout>
            <Switch>
              <ProtectedRoute exact path={ROUTES.home} component={HomePage} />
              <ProtectedRoute
                path={ROUTES.listUsers}
                component={UserListPage}
              />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Suspense>
  );
};