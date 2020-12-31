import React from 'react';
import  {Navigate}  from 'react-router-dom';
import NotFoundView from '../layouts/NotFoundView';
import Home from '../containers/Home';
import MainLayout from '../layouts/MainLayout';
import CreateDentist from '../containers/dentist/CreateDentist';

const routes = [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/create/dentist', element: <CreateDentist /> },
        //  { path: 'login', element: <LoginView /> },
       // { path: 'register', element: <RegisterView /> },
        { path: '404', element: <NotFoundView /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ];
  
  export default routes;