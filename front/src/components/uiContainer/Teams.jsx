import React, { useEffect, useState } from 'react';
import CardList from '../ui/card-list';

const Teams = () => {
  const [teams, setTeam] = useState([]);
const [selectedTeam, setSelectedTeam] = useState([]);

  useEffect((isMain) => {
    fetch('/api/Masters')
      .then(res => res.json())
      .then(data => {
      // Если flag true — фильтруем, иначе берем все
      const selectedTeam = isMain ? data.filter(item => item.topMaster === true) : data;
      setTeam(selectedTeam);

      
      console.log('Загруженные masters:', selectedTeam);
    })
  }, []);

  const handleLearnMore = (id) => {
    console.log('Learn more about teams', id);
    
  };

  return (
   <div>
      <div className='title-container'>
        <h3 className='title'>Our Team</h3>
        <div className='bottom-line'></div>
      </div>
  <CardList products={teams} onLearnMore={handleLearnMore} />;
    </div>
  );
};

export default Teams;
