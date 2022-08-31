import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export const YelpContext = createContext();

export default function YelpContextProvider({children}) {
  const [authState, setAuthState] = useState( null );
  
  const [inputsReg, setInputsReg] = useState({ name: '', email: '', password: '' });
  
  const [inputs, setInputs] = useState({ email: '', password: ''});
  const navigate = useNavigate();

  const changeHandlerReg = (e) => {
    setInputsReg((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const changeHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    fetch('http://localhost:3002/auth', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {setAuthState(res);});
  }, []);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(inputs),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setAuthState(data);
      navigate('/');
      console.log(setAuthState);
      console.log(authState)

    }
  };

  const submitHandlerReg = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3002/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(inputsReg),
    });
    if (response.ok) {
      const data = await response.json();
      setAuthState(data);
      navigate('/');
    }
  };
  const logoutHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3002/logout',{
      credentials: 'include',
    });
    if (response.ok) {
      setAuthState(null);
      navigate('/');
    }
  };

  return (
    <YelpContext.Provider 
    value={{
      authState,
      setAuthState,
      inputsReg,
      setInputsReg,
      inputs,
      setInputs,
      changeHandler,
      submitHandler,
      logoutHandler,
      submitHandlerReg,
      changeHandlerReg
    }}
    >
      {children}

    </YelpContext.Provider>

  )
}
