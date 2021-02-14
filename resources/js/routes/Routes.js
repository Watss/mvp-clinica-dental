import React from 'react';
import { Navigate } from 'react-router-dom';
import NotFoundView from '../layouts/NotFoundView';
import Home from '../containers/Home';
import MainLayout from '../layouts/MainLayout';
import CreateDentist from '../containers/dentist/CreateDentist';
import Dentist from '../containers/dentist/Dentist';
import CreateItem from '../containers/items/CreateItem';
import Items from '../containers/items/Items';
import CreateSchedule from '../containers/schedule/CreateSchedule';
import Patients from '../containers/patients/Patients';
import CreatePatients from '../containers/patients/CreatePatients';
import AppointmentSchedule from '../containers/appointment_schedule/AppointmentSchedule';


const routes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/dentist/create', element: <CreateDentist /> },
            { path: '/dentist', element: <Dentist /> },

            { path: '/items/create', element: <CreateItem /> },
            { path: '/items', element: <Items /> },

            { path: '/schedule/create', element: <CreateSchedule /> },
            { path: '/patients/create', element: <CreatePatients /> },
            { path: '/patients', element: <Patients /> },
            //  { path: 'login', element: <LoginView /> },
            // { path: 'register', element: <RegisterView /> },


            { path: '/schedule/create', element: <CreateSchedule /> },


            { path: '/appointment-schedule', element: <AppointmentSchedule /> },



            { path: '404', element: <NotFoundView /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    }
];

export default routes;
