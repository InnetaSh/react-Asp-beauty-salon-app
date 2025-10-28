import React, { useEffect, useState } from 'react';


import Header from '../../components/uiContainer/Header';
import Services from '../../components/uiContainer/Services';


export default function ServicesPage({flag,  token, setToken }) {
  

  return (
    <div className='main'>
      <div className='main-container'>
        <Header token={token} setToken ={setToken}/>
        <Services flag={flag} />

       
      </div>
    </div>
  );
}
