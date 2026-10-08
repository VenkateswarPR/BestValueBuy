import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';

import Login from './pages/Login';
import Register from './pages/Register';

import PostProperty from './pages/PostProperty';
import Dashboard from './pages/Dashboard';
import Shortlist from './pages/Shortlist';

import './styles.css';


export default function App() {

  return (
    <>
      <Header />

      <main>

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />


          {/* BUY / RENT PROPERTIES */}
          <Route
            path="/properties"
            element={<Properties />}
          />


          {/* PROPERTY DETAILS */}
          <Route
            path="/properties/:id"
            element={<PropertyDetails />}
          />


          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />


          {/* REGISTER */}
          <Route
            path="/register"
            element={<Register />}
          />


          {/* POST / EDIT PROPERTY */}
          <Route
            path="/post-property"
            element={<PostProperty />}
          />


          {/* MY PROPERTIES */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* SHORTLIST */}
          <Route
            path="/shortlist"
            element={<Shortlist />}
          />

        </Routes>

      </main>


      <footer>

        <strong>
          BestValueBuy
        </strong>

        <span>
          Find the Right Property. Get the Best Value.
        </span>

      </footer>

    </>
  );
}