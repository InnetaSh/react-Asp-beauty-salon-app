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

  return <CardList products={teams} onLearnMore={handleLearnMore} />;
};

export default Teams;
