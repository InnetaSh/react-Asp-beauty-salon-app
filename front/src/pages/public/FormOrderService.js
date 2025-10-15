import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { formatUrlToCategory } from '../../utils/urlHelpers';
import { formatCategoryToUrl } from '../../utils/urlHelpers';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/uiContainer/Header';
import BunnerImg from '../../components/ui/bunner-img';
import BunnerTitle from '../../components/ui/bunner-title';
import InfoMaster from '../../components/ui/info-master';
import CardMaster from "../../components/ui/card-master"
import ImgList from '../../components/ui/img-list';

export default function FormOrderService() {
  const { category, subcategory, masterId } = useParams();
  const decodedSubCategory = formatUrlToCategory(subcategory);

  const [master, setMaster] = useState([]);
  console.log("Category:", category);
  console.log("Subcategory:", decodedSubCategory);
  console.log("masterId:", masterId);
  const navigate = useNavigate();


 const [clientName, setClientName] = useState("");
  const [contact, setContact] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");



  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const [works, setWorks] = useState([]);

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





  console.log(works);
  const handleLearnMore = () => {
    console.log('Learn more about product');

  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      clientName,
      contact,
      appointmentDate,
      appointmentTime,
      masterId,
      subServiceId,
      status,
    };

    try {
      const res = await fetch("/api/OrderServices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Ошибка при создании записи");
      }

      setMessage("Запись успешно создана!");
      setClientName("");
      setContact("");
      setAppointmentDate("");
      setAppointmentTime("");
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };




  const handleMasterInfo = (masterId) => {



    console.log('master id:', masterId);



  };

  return (
    <div className='main'>
      <div className='main-container'>
        <Header />
        <BunnerTitle title={master.name || 'Our Masrets'} />


        <div className="main-details">
           <form onSubmit={handleSubmit}>
        <div>
          <label>Имя клиента:</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Контакт:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>

        <div>
          <label>Дата:</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Время:</label>
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>

        <button type="submit">Записаться</button>
      </form>
        </div>
        
      </div>
    </div>


  );
}
