import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { formatUrlToCategory } from '../../utils/urlHelpers';
import { formatCategoryToUrl } from '../../utils/urlHelpers';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/uiContainer/Header';
import BunnerImg from '../../components/ui/bunner-img';
import BunnerTitle from '../../components/ui/bunner-title';
import BtnGreyList from '../../components/ui/btn-grey-list';
import CardListMaster from "../../components/ui/card-list-master"

export default function MasterDetailPage() {
  const { category, subcategory, masterId } = useParams();
  const decodedSubCategory = formatUrlToCategory(subcategory);

  const [master, setMaster] = useState([]);
  console.log("Category:", category);
  console.log("Subcategory:", decodedSubCategory);
    console.log("masterId:", masterId);
  const navigate = useNavigate();

  
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!subcategory) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);


        const mastersRes = await fetch(`/api/Masters/${masterId}`);
        if (!mastersRes.ok) throw new Error("Masters not found");
        const mastersData = await mastersRes.json();
        setMaster(mastersData);
        console.log("Найден master on detail page: ", mastersData);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subcategory]);








  const handleMasterInfo = (masterId) => {
 


    console.log('master id:', masterId);



  };

  return (
    <div className='main'>
      <div className='main-container'>
        <Header />
        <BunnerTitle title={master.name || 'Our Masrets'} />

 
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
