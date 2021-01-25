import React from 'react';
import  {Navigate}  from 'react-router-dom';
import NotFoundView from '../layouts/NotFoundView';
import Home from '../containers/Home';
import MainLayout from '../layouts/MainLayout';
import CreateDentist from '../containers/dentist/CreateDentist';
import Dentist from '../containers/dentist/Dentist';
import CreateItem from '../containers/items/CreateItem';
import Items from '../containers/items/Items';

const routes = [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/dentist/create', element: <CreateDentist /> },
        { path: '/dentist', element: <Dentist /> },
        { path: '/item/create', element: <CreateItem /> },
        { path: '/item', element: <Items /> },
        { path: '404', element: <NotFoundView /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ];
  
  export default routes;