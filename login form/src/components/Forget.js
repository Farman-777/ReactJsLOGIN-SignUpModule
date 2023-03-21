import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import './Forget.css';

function Forget() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data, status } = await axios.post(
        'http://localhost:8000/sentEmail',
        { email: enteredEmail },
        { headers: { 'Content-Type': 'application/json' } }
      );
      Swal.fire({
        icon: status === 200 ? 'success' : 'error',
        title: status === 200 ? 'Success!' : 'Error!',
        text:
          status === 200
            ? 'Your password reset email has been sent.'
            : data.error.message,
      }).then((result) => {
        if (status === 200 && result.isConfirmed) {
          // navigate('/reset');
        }
      });
    } catch (error) {
      console.error(error);
    
      
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
      });
    }
  };

  return (
    <div className='containerforget'>
      <div className='containerBox'>
        <form onSubmit={submitHandler} className='forgetSubmit'>
          <h1>Forget Password</h1>
          <div className='contentBox'>
            <label>Enter Email </label>
            <input
              type='email'
              value={enteredEmail}
              onChange={changeHandler}
              className='forgetInput'
              required
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Forget;
