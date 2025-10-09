import React, { useEffect, useState } from 'react';
import CardList from '../ui/card-list';

const Teams = () => {
  const [teams, setTeam] = useState([]);

  useEffect(() => {
    fetch('/api/UI/team')
      .then(res => res.json())
      .then(data => setTeam(data));
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
