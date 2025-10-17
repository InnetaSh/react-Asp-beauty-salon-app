import React, { useEffect, useState } from 'react';
import CardList from '../ui/card-list';
import EditMasterModal from "../modals/EditMasterModal"

const Teams = (isMain) => {
  const [teams, setTeam] = useState([]);
  const [editingTeam, setEditingTeam] = useState([]);


  const fetchMasters = () => {
    fetch('/api/Masters')
      .then(res => res.json())
      .then(data => {

        const selectedTeam = isMain ? data.filter(item => item.topMaster === true) : data;
        setTeam(selectedTeam);


        console.log('Загруженные masters:', selectedTeam);
      })
  };

  useEffect(() => {
    fetchMasters();
  }, [isMain]);


  const handleLearnMore = (id) => {
    console.log('Learn more about teams', id);

  };



  const handleDelete = async (id) => {
    if (!window.confirm("Удалить этот сервис?")) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Ошибка удаления");

      fetchMasters();
    } catch (err) {
      console.error("Ошибка при удалении:", err);
    }
  };

  const handleEdit = (master) => {
    setEditingTeam(master);

    console.log("Редактирование:", master);
  };


  return (
    <div>
      <div className='title-container'>
        <h3 className='title'>Our Team</h3>
        <div className='bottom-line'></div>
      </div>
      <CardList products={teams} onLearnMore={handleLearnMore} />;

    
      {editingTeam && (
        <EditMasterModal
          service={editingTeam}
          onClose={() => setEditingTeam(null)}
          onSave={fetchMasters}
        />
      )}
    </div>
  );
};

export default Teams;
