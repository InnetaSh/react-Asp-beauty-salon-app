import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { formatUrlToCategory } from '../../utils/urlHelpers';
import { formatCategoryToUrl } from '../../utils/urlHelpers';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/uiContainer/Header';
import BunnerImg from '../../components/ui/bunner-img';
import BunnerTitle from '../../components/ui/bunner-title';
import BtnGreyList from '../../components/ui/btn-grey-list';
import CardList from "../../components/ui/card-list"

export default function ServiceCategoryDetailPage() {
 const { category, subcategory } = useParams();

  console.log("Category:", category);          
  console.log("Subcategory:", subcategory); 
  const navigate = useNavigate();
  const location = useLocation();
  

  const [subCategory, setSubCategory] = useState(null);




   




  const handleCategoryClick = () => {
   
  };

  const handleLearnMore =()=>{
     
  };


  return (
    <div className='main'>
      <div className='main-container'>
        <Header />
     
        <div className="main-details">
          <div className='left-container'>
           
          </div>
          <div className='right-container'>
           
          </div>
        </div>
      </div>
    </div>
  );
}
