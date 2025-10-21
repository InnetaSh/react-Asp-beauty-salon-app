import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { formatUrlToCategory } from '../../utils/urlHelpers';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/uiContainer/Header';
import BunnerTitle from '../../components/ui/bunner-title';

import '../../index.css'

export default function FormOrderService() {
  const navigate = useNavigate();
  

  const { category, subcategory, masterId } = useParams();
  const decodedSubCategory = formatUrlToCategory(subcategory);

  const [master, setMaster] = useState([]);
  console.log("Category:", category);
  console.log("Subcategory:", decodedSubCategory);
  console.log("masterId:", masterId);

  const [subServiceId, setSubServiceId] = useState(null);
  const [clientName, setClientName] = useState("");
  const [contact, setContact] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");



  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [works, setWorks] = useState([]);
  const [congratulationText, setCongratulationText] = useState("Вы успешно записались! Наш мастер в скорем времени с Вами свяжется для уточнения деталей.");



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
      // const res = await fetch("/api/OrderServices", {
      //   method: "POST",
      //    headers: { "Content-Type": "application/json" },
      //    body: JSON.stringify(order),
      // });

      // if (!res.ok) {
      //   const errorData = await res.json();
      //   throw new Error(errorData.message || "Ошибка при создании записи");
      // }

      setMessage("Запись успешно создана!");
      setClientName("");
      setContact("");
      setAppointmentDate("");
      setAppointmentTime("");
      const congratulationEl = document.getElementById("congratulationText");
      congratulationEl.classList.remove("non-display");


      setTimeout(() => {
        congratulationEl.classList.add("non-display");
      }, 8000);
        setTimeout(() => {
     navigate(`/`);
      }, 10000);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };




  return (
    <div className='main'>
      <div className='main-container'>
        <Header />
        <BunnerTitle title={master.name || 'Our Master'} />
        <div className='text-wrapper non-display' id="congratulationText">
          <div className='big-text'>{congratulationText}</div>
        </div>

        <div className="main-details">
          <form onSubmit={handleSubmit}>
            <div className='input-container'>
              <label>Имя клиента:</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>

            <div className='input-container'>
              <label>Контакт:</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <div className='input-container'>
              <label>Дата:</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />
            </div>

            <div className='input-container'>
              <label>Время:</label>
              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
              />
            </div>

            <button type="submit" className='btn-gold '>Записаться</button>
          </form>
        </div>

      </div>
    </div>


  );
}
