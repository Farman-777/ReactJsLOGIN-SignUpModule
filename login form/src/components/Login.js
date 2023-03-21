import { useNavigate ,Link } from 'react-router-dom'
import HomePage from './HomePage';
import React,{ useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios'
import './Login.css' 


const  Login = () => {
const navigate = useNavigate();

const [EnteredEmail,setEmail] = useState('');
const [EnteredPassword,setPass] = useState('');
// const [FV,setFV] = useState('')

const handleEmail = (event) => { setEmail(event.target.value)  }
const handlePass = (event) => { setPass(event.target.value) }


const handleSubmit = (event) => {
  event.preventDefault();
  if (EnteredEmail && EnteredPassword) {
    const data = { email: EnteredEmail, password: EnteredPassword };
    axios.post("http://localhost:3001/form", data)
      .then(response => {
        // console.warn(response.data[0].FirstLogin) //line added
        if (response.status === 200) {      
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            showConfirmButton: false,
            timer: 1500
         }) 
         navigate("/homePage",{state:{email:EnteredEmail}});
        }
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect email or password!',
        });
      });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter both email and password!',
    });
  }
  // setFV(EnteredEmail);
  // <HomePage email="farman@gmail.com"></HomePage>
}


  return (<>
    <div className='parent'>
    <form onSubmit={handleSubmit} className='loginform' method='post'>
      <h1>Login Page</h1>
      <div className='content'>
        <label>Email</label>
        <input type='text' value={EnteredEmail} onChange = { handleEmail } />
      </div>
      <div className='content'>
        <label>Password</label>
        <input type='password' value={EnteredPassword} onChange = { handlePass } />
      </div>
      <button type='submit' id='loginbutton'>Submit</button>
      <div className='text'>Need an account?<Link to="/signup" className='account'> Register</Link><br/><Link to="/forgetActual" className='account'>forgot password!</Link></div>
    </form>
  </div>
  
  </>
  
  )
}

export default Login;