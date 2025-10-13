import React, { useEffect, useState } from 'react';


import Header from '../../components/uiContainer/Header';
import Services from '../../components/uiContainer/Services';


export default function ServicesPage() {
  const [bunner, setBunner] = useState([]);
 

  useEffect(() => {
    fetch('/api/UI/services')
      .then(res => res.json())
      .then(data => setBunner(data));
  }, []);


 
 

  return (
    <div className='main'>
      <div className='main-container'>
        <Header />
        <Services flag={true} />

       
      </div>
    </div>
  );
}
