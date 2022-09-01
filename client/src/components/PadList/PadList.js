import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../redux/actions/authActions';
import { setPad } from '../../redux/actions/formPadActions';
import FormPad from '../FormPad/FormPad';

export default function PadList() {
  const { pad, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!pad?.length) {
      fetch('http://localhost:3002/pad')
        .then((res) => res.json())
        .then((data) => dispatch(setPad(data)));
    }
  }, []);

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
    <>
      {auth && <FormPad />}
      <div>
        {pad?.map((el) => (
          <div>
            {el.name}
          </div>
        ))}
      </div>
    </>
  );
}
