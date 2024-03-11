import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:''
  })

  const login = async () => {
    console.log('Login function executed', formData);
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const responseData = await response.json();
        console.log(responseData);
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            alert('Login Success.');
            window.location.replace('/');
        } else {
            alert(responseData.error);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

const signup = async () => {
  console.log('Sign Up function executed', formData);

  // Basic validation (optional)
  if (!formData.username || !formData.email || !formData.password) {
    alert('Please fill in all required fields.');
return;
  }
  try {
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

   if(!response.ok){
    throw new Error('Somethinwrrong while posting userdata to db' );
   }
   const responseData = await response.json();
   console.log(responseData.success);

    if (responseData.success) {
      console.log('success');
      localStorage.setItem('auth-token', responseData.token);
      alert('Singup succesful.');
      window.location.replace('/');
    } else {
      alert(responseData.error);
    }
  } catch (error) {
    console.error('error occured',error);
  }
};



  const changeHandler = (e) =>{
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  return (
    <div className='login'>
      <div className="login-container">
        <h1>{state}</h1>
        <div className="login-fields">

          {state === 'Sign Up'?<input type="text" name='username' onChange={changeHandler} placeholder='Enter your name' value={formData.username} />:<></>}

          <input type="email" placeholder='Enter your email' name='email' onChange={changeHandler} value={formData.email}/>

          <input type="password" placeholder='Enter your password' name='password' onChange={changeHandler} value={formData.password}/>

        </div>
        <button onClick={()=>{state === 'Login'?login():signup()}}>Continue</button>

        {state === 'Sign Up'?<p className='bottom-text'>Already have an account ? <span onClick={()=>{setState('Login')}}>Login here</span></p>:<></>}

        {state === 'Login'?<p className='bottom-text'>Don't have an account ? <span onClick={()=>{setState('Sign Up')}}>Create here</span></p>:<></>}

        <div className="login-checkbox">
          <label>
          <input type="checkbox" name='' className='checkbox'/>
            By clicking this, you areaccepting our terms and privacy policy.
          </label>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup