import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./SignUpPage.css";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleFirstNameChange = (event) => { setFirstName(event.target.value); };
  const handleLastNameChange = (event) => { setLastName(event.target.value); };
  const handleEmailChange = (event) => { setEmail(event.target.value); };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(
      !event.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    );
    
    if (event.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      setPasswordError(false);
    }
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();
   
      if(!passwordError){
        const data = {
          fname: firstName,
          lname: lastName,
          email: email,
          password: password,
        };
        // Do something with the form data, like submit to an API
        axios.post("http://localhost:4501/addList", data).then(()=>{ 
          navigate("/login");
        });
        console.log("Submitted:", data);
      }
   
  };

  return (
  
    <div className="container" >
      <h2 className="title">Sign Up</h2>

      <form onSubmit={handleSubmit} method="post">
        <div className="form-group">
          <label id="Signuplabel">First Name</label>
          <input
            type="text"
            id="input"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label id="Signuplabel">Last Name</label>
          <input
            type="text"
            id="input"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label id="Signuplabel">Email</label>
          <input
            type="email"
            id="input"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label id="Signuplabel">Password</label>
          <input
            type="password"
            id={`input ${passwordError ? 'input-error' : ''}`}
            value={password}
            onChange={handlePasswordChange}
            className="SignInput"
            required
          />
          {passwordError && <span className="error">{`
            Password should be at least 8 characters long and contain at least 
            one uppercase letter, one lowercase letter,and one number `}</span>}
        </div>
        <button
          type="submit"
          id="SignupButton"          
        >
          Submit
        </button>
      </form>
    </div>

  );
};

export default SignUpPage;
//second time i have changed