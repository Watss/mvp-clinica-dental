import React from 'react';
import  {Navigate}  from 'react-router-dom';
import NotFoundView from '../layouts/NotFoundView';
import Home from '../containers/Home';
import MainLayout from '../layouts/MainLayout';
import CreateDentist from '../containers/dentist/CreateDentist';
import Dentist from '../containers/dentist/Dentist';
import CreateSchedule from '../containers/schedule/CreateSchedule';

const routes = [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/dentist/create', element: <CreateDentist /> },
        { path: '/dentist', element: <Dentist /> },
        { path: '/schedule/create', element: <CreateSchedule /> },
        //  { path: 'login', element: <LoginView /> },
       // { path: 'register', element: <RegisterView /> },
        { path: '404', element: <NotFoundView /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ];
  
  export default routes;