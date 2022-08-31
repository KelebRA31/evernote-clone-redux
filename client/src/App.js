import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './components/Auth/LoginPage'
import RegPage from './components/Auth/RegPage'
import YelpContextProvider from './context/YelpContextProvider';
import HomePage from './components/HomePage/HomePage'



function App() {
  const [authState, setAuthState] = useState(null)
  return (
    <div className="App">
      <YelpContextProvider>

      <NavBar authState={authState} setAuthState={setAuthState} />
      <Routes>
        <Route path="/login" element={<LoginPage />} setAuthState={setAuthState}/>
        <Route path="/registration" element={<RegPage />} setAuthState={setAuthState}/>
        <Route path="/" element={<HomePage />} />

      </Routes>
      </YelpContextProvider>

    </div>
  );
}

export default App;
