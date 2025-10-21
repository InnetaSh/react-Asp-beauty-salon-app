
import React, { useEffect, useState } from 'react';
import icon from '../../img/Auth/icon.png'
import backImageSrc from '../../img/Auth/back.jpg'
import Header  from '../../components/uiContainer/Header';

import '../../index.css'


const menu_list = [
  { title: 'home', path: '/' },
  { title: 'services', path: '/services' },
  { title: 'shop', path: '/products' },
  { title: 'Blog', path: '/reviews' },
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' }
];


const AuthForm = () => {
     const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const toggleMode = () => {
    setIsRegister(prev => !prev);
  };


  useEffect(() => {
    fetch('/api/UI/name')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setName(data[0].title);
        }
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // ----------------------------
    console.log('Submit');
  };

  return (
    <div className="main">
        <div className='main-container-auth'>
       <Header />
   
      <div className="login-form-container">
        <div className="login-form-containerBlock" id="login-form-content">

          <h1 id="pageHeader">{isRegister ? "Register" : "LogIn"}</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            
              <input
                type="text"
                name="userName"
                placeholder="Username"
                size="18"
                className="login-form-inputBlock"
                style={{
                 background: `#eae7e7 url(${icon}) no-repeat`,
                  backgroundPosition: "10px 10px",
                  paddingLeft: "40px"
                }}

                required
              />

            
              <input
                type="password"
                name="userPassword"
                placeholder="Password"
                className="login-form-inputBlock"
                style={{
                  background: `#eae7e7 url(${icon}) no-repeat`,
                  backgroundPosition: "10px -53px",
                  paddingLeft: "40px"
                }}
                required
              />
          
            {isRegister && (
              <>
                
                  <input
                    type="text"
                    id="phoneField"
                    name="userPhone"
                    placeholder="+80(dd)dd-dd-ddd"
                    className="login-form-inputBlock"
                    style={{
                      background: `#eae7e7 url(${icon}) no-repeat`,
                      backgroundPosition: "10px -103px",
                      paddingLeft: "40px"
                    }}
                  />
            

               
                  <input
                    type="email"
                    name="userGmail"
                    placeholder="Введите адрес почты"
                    id="gmailField"
                    style={{
                     background: `#eae7e7 url(${icon}) no-repeat`,
                      backgroundPosition: "10px -163x",
                      paddingLeft: "40px"
                    }}
                    className="login-form-inputBlock"
                  />
               

                <div id="genderField" className="login-form-containerRadioBtn">
                  <label className='login-form-label'>
                    <input
                      type="radio"
                      value="мужской"
                      className="login-form-radio"
                      name="gender"
                      defaultChecked
                    />
                    мужской
                  </label>
                  <label className='login-form-label'>
                    <input
                     className="login-form-radio"
                      type="radio"
                      value="женский"
                      name="gender"
                    />
                    женский
                  </label>
                </div>
              </>
            )}

            <div className="login-form-containerBtn">
              <button type="submit" className="btn-gold btn" id="authButton">
                {isRegister ? "Register" : "LogIn"}
              </button>

              <a href="#" id="toggleLink" onClick={(e) => {
                e.preventDefault();
                toggleMode();
              }}>
                {isRegister ? "LogIn" : "Register"}
              </a>
            </div>
          </form>

        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthForm;
