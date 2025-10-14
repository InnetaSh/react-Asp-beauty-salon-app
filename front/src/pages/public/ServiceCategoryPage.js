import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { formatUrlToCategory } from '../../utils/urlHelpers';
import { formatCategoryToUrl } from '../../utils/urlHelpers';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/uiContainer/Header';
import BunnerImg from '../../components/ui/bunner-img';
import BunnerTitle from '../../components/ui/bunner-title';
import BtnGreyList from '../../components/ui/btn-grey-list';
import CardListSubService from "../../components/ui/card-list-sub-service"

export default function ServiceCategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const decodedCategory = formatUrlToCategory(category);

  const { categories = [], services = [] } = location.state || {};
  const [bunner, setBunner] = useState(services); 



const subServiceTitles = services
  ?.filter(service => service?.category?.toLowerCase() === decodedCategory?.toLowerCase())
  ?.flatMap(service => service?.subServices || [])
  ?.filter(Boolean) || [];


console.log("SubService Titles:", subServiceTitles);
console.log("services",services);
console.log("categories",decodedCategory);

  useEffect(() => {
    if (!services?.length) {
      fetch('/api/services')
        .then(res => res.json())
        .then(data => setBunner(data));
    }
  }, [services]);

  const foundBanner = bunner.find(
    b => b?.category?.toLowerCase() === decodedCategory.toLowerCase()
  );

  const handleBooking = () => {
    console.log('Записаться на услугу:', foundBanner);
 
  };

  const handleSubCategory= (subServiceTitle) => {
   

    const urlSubCategory = formatCategoryToUrl(subServiceTitle); 
     console.log('Записаться на услугу:', category, urlSubCategory);
   
    navigate(`/services/${category}/${urlSubCategory}`);
 
  };

  const handleCategoryClick = (clickedCategory) => {
    const urlCategory = formatCategoryToUrl(clickedCategory);
    if (urlCategory === "all"){
       navigate(`/services`, {
      state: { categories, services }
    });
    }else{
    
    navigate(`/services/${urlCategory}`, {
      state: { categories, services }
    });
    console.log('Learn more about product', clickedCategory);
  }
  };


  return (
    <div className='main'>
      <div className='main-container'>
        <Header />
        <BunnerTitle title={foundBanner?.category || 'Услуга'} />
        <div className="main-details">
          <div className='left-container'>
            {foundBanner && (
              <>
              <BunnerImg flag={true} bunners={[foundBanner]} />
               <p>{foundBanner.description}</p>
               <CardListSubService products={subServiceTitles} onLearnMore={handleSubCategory} />
               </>
            )}
          </div>
          <div className='right-container'>
            <BtnGreyList categories={categories} onClick={handleCategoryClick} />

            {foundBanner && (
              <div className="service-description">
                <button onClick={handleBooking} className="book-btn">
                  Записаться
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
