import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import PostProperty from './pages/PostProperty';
import Dashboard from './pages/Dashboard';
import './styles.css';
export default function App(){return <><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/properties" element={<Properties/>}/><Route path="/properties/:id" element={<PropertyDetails/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/post-property" element={<PostProperty/>}/><Route path="/dashboard" element={<Dashboard/>}/></Routes></main><footer><strong>BestValueBuy</strong><span>Find the Right Property. Get the Best Value.</span></footer></>}
