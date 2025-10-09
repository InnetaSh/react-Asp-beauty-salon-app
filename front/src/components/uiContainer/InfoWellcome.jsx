import React, { useEffect, useState } from 'react';

const InfoWelcome = () => {
  const [info, setInfo] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch('/api/UI/infoText')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setInfo(data[0].text);
        }
        console.log("info");
        console.log(info);
      });
  }, []);

  useEffect(() => {
    fetch('/api/UI/name')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setName(data[0].title);
        }
      });
  }, []);

  return (
    <div className='info-container'>
      <div className="title-container">
        <h3 className='title'>Welcome to {name}</h3>
        <div className='bottom-line'></div>
      </div>

      {info && <div>{info}</div>}
    </div>
  );
};

export default InfoWelcome;
