import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatUrlToCategory } from '../../utils/urlHelpers';
import Header from '../../components/uiContainer/Header';
import BunnerTitle from '../../components/ui/bunner-title';
import Masters from "../../components/uiContainer/Masters";

export default function SubServiceDetailPage() {
  const { category, subcategory } = useParams();
  const decodedSubCategory = formatUrlToCategory(subcategory);
  const navigate = useNavigate();

  const [subServiceId, setSubServiceId] = useState(null);
  const [description, setDescription] = useState('');
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получаем ID подуслуги и мастеров
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/Services/subservice/id-by-title?title=${encodeURIComponent(decodedSubCategory)}`);
        if (!res.ok) throw new Error("SubService not found");

        const subServiceData = await res.json();
        setSubServiceId(subServiceData.id);

        // Описание
        const descriptionRes = await fetch(`/api/Services/subservice/${subServiceData.id}`);
        if (!descriptionRes.ok) throw new Error("SubService description not found");
        const descriptionData = await descriptionRes.json();
        setDescription(descriptionData.description);

        // Мастера
        const mastersRes = await fetch(`/api/Services/subservice/${subServiceData.id}/masters/full`);
        if (!mastersRes.ok) throw new Error("Masters not found");
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
    // повторно загружает мастеров после редактирования/удаления
    if (subServiceId) {
      fetch(`/api/Services/subservice/${subServiceId}/masters/full`)
        .then(res => res.json())
        .then(setMasters)
        .catch(err => console.error("Ошибка при обновлении мастеров:", err));
    }
  };

  return (
    <div className='main'>
      <div className='main-container'>
        <Header />
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
