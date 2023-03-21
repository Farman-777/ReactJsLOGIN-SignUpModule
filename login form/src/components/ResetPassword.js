import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Swal from 'sweetalert2'
import "./ResetPassword.css";
import axios from 'axios'

function ResetPassword() {
  const navigate = useNavigate();
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [enteredConfirmPassword, setConfirmPassword] = useState("");

  const emailHandler = (e) => { setEmail(e.target.value) }
  const passwordHandler = (e) => { 
    setPassword(e.target.value)
    setPasswordError(
      !e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    );
    
    if (e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      setPasswordError(false);
    } }
  const confirmHandler = (e) => { 
    setConfirmPassword(e.target.value)
    setPasswordError(
      !e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    );
    
    if (e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      setPasswordError(false);
    } }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email:enteredEmail,
      password:enteredPassword,
      confirmPassword:enteredConfirmPassword
    }

    
    
    // Add code to reset password here
    axios.post("http://localhost:4500/resetPassword",data)
    .then(response => {
      if (response.status === 200) {
       
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Successful',
          showConfirmButton: false,
          timer: 1500
       })
       navigate('/login');
      }
    }).catch(error => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password Reset Failed..',
      });
  });
}
  return (
    <div className="Parent-container">
    <div className="Container">
      <h1 className="H1">Reset Password</h1>
      <form onSubmit={handleSubmit} className="Form">
        <label htmlFor="email" className="Label">Email</label>
        <input  className="Input"
          type="email"
          id="email"
          name="email"
          value={enteredEmail}
          onChange={emailHandler}
          required
        />
        <label htmlFor="password" className="Label">New Password</label>
        <input className="Input"
          type="password"
          id="password"
          name="password"
          value={enteredPassword}
          onChange={passwordHandler}
          required
        />
        <label htmlFor="confirm-password" className="Label">Confirm Password</label>
        <input className="Input"
          type="password"
          id={`confirm-error ${passwordError ? 'confirmed-error' : ''}`}
          name="confirm-password"
          value={enteredConfirmPassword}
          onChange={confirmHandler}
          required
        />
          {passwordError && <span className="confirmedError">{`
          Password should be at least 8 characters long and contain at least 
          one uppercase letter, one lowercase letter,and one number `}</span>}
        
        <button type="submit" className="Button">Reset Password</button>
      </form>
    </div>
    </div>
  );
}

export default ResetPassword;
