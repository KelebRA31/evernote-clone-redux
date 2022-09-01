import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../../redux/actions/authActions';

function Login() {
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // useEffect(() => {
  //   fetch('http://localhost:3002/auth', {
  //     credentials: 'include',
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       dispatch(setAuth(res));
  //     });
  // }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3002/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(inputs),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch(setAuth(data));
      navigate('/');
    }
  };

  return (
    <div>
      <h1 className="text-center text-uppercase registration">Вход</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Почта</label>
          <input name="email" onChange={changeHandler} value={inputs.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
          <input name="password" onChange={changeHandler} value={inputs.password} type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Войти</button>
      </form>
    </div>
  );
}

export default Login;
