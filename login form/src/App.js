import { BrowserRouter ,Routes ,Route } from 'react-router-dom';
import ResetPassword from './components/ResetPassword';
import SignUpPage from './components/SignUpPage';
import Forget from './components/Forget';
import Login from './components/Login';
import React from 'react';
import Form from './components/Form'
import HomePage from './components/HomePage';
import './App.css';

const App = () => {
  return(
<div>
  <BrowserRouter>  
  {/* <Login></Login> */}
  {/* <SignUpPage></SignUpPage> */}
{/* <ResetPassword></ResetPassword> */}
{/* <Forget></Forget> */}
{/* <Form></Form> */}
    <Routes>
      {/* <Route path='/forget' element={<Form />}></Route> */}
      <Route path="/reset" element={<ResetPassword/>} />
      <Route path="/signup" element={ <SignUpPage /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/homePage" element={ <HomePage /> } />
      <Route path="/forgetActual" element={ <Forget/> }></Route>
    
    </Routes>
</BrowserRouter>

</div>
  );
}

export default App;