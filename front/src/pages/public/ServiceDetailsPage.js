//Описание услуги, кнопка "Записаться"
/// /services/:id
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Header from '../../components/uiContainer/Header'
import BunnerSmall from '../../components/ui/bunner-small';

export default function ServiceDetailsPage() {
   const { id } = useParams();

const [bunner, setBunner] = useState([]);
 

  useEffect(() => {
    fetch('/api/UI/services')
      .then(res => res.json())
      .then(data => setBunner(data));
  }, []);

  const handleLearnMore = (id) => {
    console.log('Learn more about topServices', id);
  };

 const foundBanner = bunner.find(b => b.id.toString() === id);
  console.log('Found Banner:',bunner,id, foundBanner);
  return(
         <div className='main'>
            <div className='main-container'>
                <Header />
               
                {foundBanner && (
          <BunnerSmall
            flag={true}
            title="Services"
            bunners={[foundBanner]} 
            onLearnMore={handleLearnMore}
          />
         
        )}
         
            </div>
        </div>
    )
}