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

export default function SubServiceDetailPage() {
  const { category, subcategory } = useParams();
  const decodedSubCategory = formatUrlToCategory(subcategory);


  console.log("Category:", category);
  console.log("Subcategory:", decodedSubCategory);
  const navigate = useNavigate();

  const [subServiceId, setSubServiceId] = useState(null);
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!subcategory) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);


        const subServiceRes = await fetch(`/api/Services/subservice/id-by-title?title=${encodeURIComponent(decodedSubCategory)}`);
        if (!subServiceRes.ok) throw new Error("SubService not found");
        const subServiceData = await subServiceRes.json();
        const subServiceId = subServiceData.id;
        setSubServiceId(subServiceId);
        console.log("SubService ID:", subServiceId);

        const mastersRes = await fetch(`/api/Services/subservice/${subServiceId}/masters/full`);
        if (!mastersRes.ok) throw new Error("Masters not found");
        const mastersData = await mastersRes.json();
        setMasters(mastersData);
        console.log("Masters:", mastersData);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subcategory]);


useEffect(() => {
  const fetchSubServiceDescription = async () => {
    try {
      setLoading(true);
      setError(null);

      const subServiceRes = await fetch(`/api/Services/subservice/${subServiceId}`);
      if (!subServiceRes.ok) throw new Error("SubService not found");

      const subServiceData = await subServiceRes.json();
      const subServiceDescription = subServiceData.description;
      setDescription(subServiceDescription);
      console.log("SubService description:", subServiceDescription);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (subServiceId) {
    fetchSubServiceDescription();
  }
}, [subServiceId]);


  console.log("Найден ID подуслуги: ", subServiceId);




  const handleMasterInfo = (id) => {


navigate(`/services/${category}/${subcategory}/${id}`);
    console.log('master id:', id);



  };

  return (
    <div className='main'>
      <div className='main-container'>
        <Header />
        <BunnerTitle title={subcategory || 'Our Masrets'} />

        <p className='text-description'>{description}</p>
        <div className="main-details">
          <div className='left-container'>
            <CardListMaster masters={masters} onLearnMore={handleMasterInfo} />
          </div>
          <div className='right-container'>

          </div>
        </div>
      </div>
    </div>
  );
}
