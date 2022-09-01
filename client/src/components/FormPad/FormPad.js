import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newPad } from '../../redux/actions/formPadActions';

export default function Form() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    name: '',
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(Object.fromEntries(new FormData(event.target))));

    const response = await fetch('http://localhost:3002/pad/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(Object.fromEntries(new FormData(event.target))),

    });

    const data = await response.json();
    dispatch(newPad(data));
    setInputValue({
      name: '',
    });
  };
  const changeHandler = (event) => {
    setInputValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">Name of pad</label>
        <input onChange={changeHandler} type="text" className="form-control" id="name" name="name" value={inputValue.name} />
      </div>
      <button type="submit" className="btn btn-primary">Add pad</button>
    </form>
  );
}
