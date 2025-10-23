
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import icon from '../../img/Auth/icon.png'
import backImageSrc from '../../img/Auth/back.jpg'
import Header from '../../components/uiContainer/Header';

import '../../index.css'


const menu_list = [
  { title: 'home', path: '/' },
  { title: 'services', path: '/services' },
  { title: 'shop', path: '/products' },
  { title: 'Blog', path: '/reviews' },
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' }
];


const AuthForm = ({ setToken }) => {
  const navigate = useNavigate();

  const [nameConpany, setNameCompany] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [roleName, setRoleName] = useState("user");



  const [error, setError] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("")
  const [shrink, setShrink] = useState(false);

  const [isRegister, setIsRegister] = useState(false);



  const handleLogin = async () => {
    if (username === "") {
      setErrorName("ім'я не повинно бути порожнім");
      return;
    }
    if (password === "") {
      setErrorPassword("пароль не повиннен бути порожнім");
      return;
    }
    setErrorName("");
    setErrorPassword("");
    setError("");

    try {
      const response = await fetch("http://localhost:5266/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        setErrorName(errorData);
        return;
      }

      const data = await response.json();

      const token = data.token;
      const role = data.role;

      localStorage.setItem("token", token);
      setToken(token);
      setRoleName(role);

      console.log(data);

      
        navigate("/");
      

    } catch (error) {
      console.error("Ошибка регистрации", error);
      setErrorName("Сталася помилка. Спробуйте знову.");
    }
  };

  const handleRegister = async () => {
    if (username === "") {
      setError("Невірний логін або пароль");
      return;
    }
    if (password === "") {
      setError("Сталася помилка. Спробуйте знову.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Пароль должен совпадать.");
      return;
    }
    setErrorName("");
    setErrorPassword("");
    setError("");

    try {
      const response = await fetch("http://localhost:5266/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password,
          email: email,
          phoneNumber: phoneNumber,
          roleName: roleName,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Користувач з таким логіном вже існує, придумайте інше.");
        } else {
          setError("Сталася помилка. Спробуйте ще раз.");
        }
        return;
      }

      const data = await response.json();

      const token = data.token;
      localStorage.setItem("token", token);
      setToken(token);

      navigate("/");

    } catch (error) {
      console.error("Помилка реєстрації", error);
      setError("Сталася помилка. Спробуйте ще раз.");
    }
  };





  const toggleMode = () => {
    setIsRegister(prev => !prev);
  };


  useEffect(() => {
    fetch('/api/UI/name')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setNameCompany(data[0].title);
        }
      });
  }, []);

  // --------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      await handleRegister();
    } else {
      await handleLogin();
    }

    console.log('Submit');
  };


    
    // ----------------------------
  useEffect(() => {
  if (errorName !== "") {
    setShrink(false); 
    const timer = setTimeout(() => setShrink(true), 100); 
    return () => clearTimeout(timer);
  }
}, [errorName]); 


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

                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />

              {isRegister && (
                <>
                  <input
                    type="password"
                    name="userPassword"
                    placeholder="confirmPassword"
                    className="login-form-inputBlock"
                    style={{
                      background: `#eae7e7 url(${icon}) no-repeat`,
                      backgroundPosition: "10px -53px",
                      paddingLeft: "40px"
                    }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

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
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
                  />


                  <div id="roleField" className="login-form-containerRadioBtn">
                    <label className='login-form-label'>
                      <input
                        type="radio"
                        className="login-form-radio"
                        name="roleState"
                        value="admin"
                        checked={roleName === 'admin'}
                        onChange={(e) => setRoleName(e.target.value)}
                    
                      />
                      admin
                    </label>
                    <label className='login-form-label'>
                      <input
                        className="login-form-radio"
                        type="radio"
                        name="roleState"
                        value="master"
                        checked={roleName === 'master'}
                        onChange={(e) => setRoleName(e.target.value)}
                      />
                      master
                    </label>
                    <label className='login-form-label'>
                      <input
                        className="login-form-radio"
                        type="radio"
                        name="roleState"
                        value="client"
                        checked={roleName === 'mastclienter'}
                        onChange={(e) => setRoleName(e.target.value)}
                      />
                      client
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
 {errorName !== "" && (
      <p className={`error-message ${shrink ? "shrink" : ""}`}>
        {error != "" && (
                      <p>{error}</p>
                    )}
                    {errorPassword != "" && (
                      <p>{errorPassword}</p>
                    )}
        {errorName}
      </p>
    )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
