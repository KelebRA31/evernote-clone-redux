import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './components/Auth/LoginPage';
import RegPage from './components/Auth/RegPage';
import { setAuth } from './redux/actions/authActions';

import HomePage from './components/HomePage/HomePage';
import FormPad from './components/FormPad/FormPad';
import PadList from './components/PadList/PadList';

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3002/auth', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(setAuth(res));
      });
  }, []);

  return (
    <div className="App">

      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/pad" element={<PadList />} />

      </Routes>

    </div>
  );
}

export default App;
