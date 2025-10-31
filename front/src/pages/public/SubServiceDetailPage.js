import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatUrlToCategory } from '../../utils/urlHelpers';
import Header from '../../components/uiContainer/Header';
import BunnerTitle from '../../components/ui/bunner-title';
import Masters from "../../components/uiContainer/Masters";

export default function SubServiceDetailPage({ token, setToken }) {
  const { category, subcategory } = useParams();
  const decodedSubCategory = formatUrlToCategory(subcategory);
  const navigate = useNavigate();

  const [subServiceId, setSubServiceId] = useState(null);
  const [description, setDescription] = useState('');
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/SubService/id-by-title/${encodeURIComponent(decodedSubCategory)}`);
        if (!res.ok) throw new Error("SubService not found");

        const subServiceData = await res.json();
        console.log("Fetched SubService Data:", subServiceData);
        setSubServiceId(subServiceData);


        const descriptionRes = await fetch(`/api/SubService/${subServiceData}`);
        if (!descriptionRes.ok) throw new Error("SubService description not found");
        const descriptionData = await descriptionRes.json();
        setDescription(descriptionData.description);


        const mastersRes = await fetch(`/api/SubService/${subServiceData}/masters/full`);
        if (!mastersRes.ok) throw new Error("Masters not found");
        console.log("Fetched Masters Data:", await mastersRes.clone().json());
        const mastersData = await mastersRes.json();
        setMasters(mastersData);

      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (subcategory) {
      fetchData();
    }
  }, [subcategory]);

  const handleRefresh = () => {
    if (subServiceId) {
      fetch(`/api/SubService/${subServiceId}/masters/full`)
        .then(res => res.json())
        .then(setMasters)
        .catch(err => console.error("Ошибка при обновлении мастеров:", err));
    }
  };

  return (
    <div className='main'>
      <div className='main-container'>
        <Header token={token} setToken={setToken}/>
        <BunnerTitle title={decodedSubCategory || 'Our Masters'} />

        <p className='text-description'>{description}</p>

        <div className="main-details">
          
            <Masters
              masters={masters}
              category={category}
              subcategory={decodedSubCategory}
              onRefresh={handleRefresh}
              buttonText='LERN MORE'
            />
        

        
        </div>
      </div>
    </div>
  );
}
