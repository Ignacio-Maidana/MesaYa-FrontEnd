import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Welcome from './pages/Welcome';
import LogInCliente from './pages/LogInClient';
import LogInRestaurant from './pages/LogInRestaurant';
import RegisterClient from './pages/RegisterClient';
import RegisterRestaurant from './pages/RegisterRestaurant';
import Catalog from './pages/Catalog';
import Reserve from './pages/Reserve';
import Carte from './pages/Carte'
import Pay from './pages/Pay';
import Reserves from './pages/Reserves';
import EditRestaurant from './pages/EditRestaurant';
import EditTables from './pages/EditTables';
import EditCarte from './pages/EditCarte';
import Plates from './pages/Plates';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
        return (
        <BrowserRouter>
        <Routes>
                <Route  path='/'
                        element={<Welcome/>} />
                <Route  path='/LogInClient'
                        element={<LogInCliente/>} />
                <Route  path='/LogInRestaurant'
                        element={<LogInRestaurant/>} />
                <Route  path='/RegisterClient'
                        element={<RegisterClient/>} />
                <Route  path='/RegisterRestaurant'
                        element={<RegisterRestaurant/>} />
                <Route  path='/Catalog'
                        element={<Catalog/>} />
                <Route  path='/Reserve'
                        element={<Reserve/>} />
                <Route  path='/Carte'
                        element={<Carte/>} />
                <Route  path='/Pay'
                        element={<Pay/>} />
                <Route  path='/Reserves'
                        element={<Reserves/>} />
                <Route  path='/EditRestaurant'
                        element={<EditRestaurant/>} />
                <Route  path='/EditTables'
                        element={<EditTables/>} />
                <Route  path='/EditCarte'
                        element={<EditCarte/>} />
                <Route  path='/Plates'
                        element={<Plates/>} />
        </Routes>
        </BrowserRouter>
        );
}

export default App;
