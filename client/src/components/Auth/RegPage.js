import React, { useContext } from 'react';

import {YelpContext} from '../../context/YelpContextProvider';



function Registration() {

  const {inputsReg, submitHandlerReg, changeHandlerReg} = useContext(YelpContext);

  return (
    <div>
      <h1 className="text-center text-uppercase registration">Регистрация</h1>
      <form onSubmit={submitHandlerReg}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">Имя</label>
          <input name="name" onChange={changeHandlerReg} value={inputsReg.name} type="text" className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Почта</label>
          <input name="email" onChange={changeHandlerReg} value={inputsReg.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
          <input name="password" onChange={changeHandlerReg} value={inputsReg.password} type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Registration;
