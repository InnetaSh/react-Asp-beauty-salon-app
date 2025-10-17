import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { formatUrlToCategory } from '../../utils/urlHelpers';
import { formatCategoryToUrl } from '../../utils/urlHelpers';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/uiContainer/Header';
import BunnerImg from '../../components/ui/bunner-img';
import BunnerTitle from '../../components/ui/bunner-title';
import BtnGreyList from '../../components/ui/btn-grey-list';
import SubServices from '../../components/uiContainer/SubServices'
import CardList from "../../components/ui/card-list"

export default function SubServicePage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const decodedCategory = formatUrlToCategory(category);

  const { categories = [], services = [] } = location.state || {};
  const [bunner, setBunner] = useState(services);



  const foundBanner = bunner.find(
    b => b?.category?.toLowerCase() === decodedCategory.toLowerCase()
  );


  const handleCategoryClick = (clickedCategory) => {
    const urlCategory = formatCategoryToUrl(clickedCategory);
    if (urlCategory === "all") {
      navigate(`/services`, {
        state: { categories, services }
      });
    } else {

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

        <div className='main-details'>
          <div className='left-container'>
            {foundBanner && (
              <>
                <BunnerImg flag={true} bunners={[foundBanner]} />
                <p>{foundBanner.description}</p>

              </>
            )}
          </div>
          <div className='right-container'>
            <BtnGreyList categories={categories} onClick={handleCategoryClick} />

          </div>
        </div>

        <div className='subService-container'>
          <SubServices />
        </div>


      </div>
    </div>
  );
}
