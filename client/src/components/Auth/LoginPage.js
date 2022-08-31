import React, { useContext } from 'react';
import {YelpContext} from '../../context/YelpContextProvider';

function Login() {
  const {inputs, changeHandler, submitHandler} = useContext(YelpContext);

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
