import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardListMaster from '../ui/card-list-master';
import EditMasterModal from '../modals/EditMasterModal';

const Masters = ({ masters, category, subcategory, onRefresh ,buttonText}) => {
  const navigate = useNavigate();
  const [editingMaster, setEditingMaster] = useState(null);

  const handleMasterInfo = (id) => {
    navigate(`/services/${category}/${subcategory}/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить этого мастера?")) return;

    try {
      const res = await fetch(`/api/masters/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Ошибка при удалении");
      onRefresh();
    } catch (err) {
      console.error("Ошибка при удалении:", err);
    }
  };

  const handleEdit = (master) => {
    setEditingMaster(master);
  };
console.log("all masters", masters);
  return (
    <>
      <CardListMaster
        masters={masters}
        onLearnMore={handleMasterInfo}
        onDelete={handleDelete}
        onEdit={handleEdit}
        buttonText ={buttonText}
      />

      {editingMaster && (
        <EditMasterModal
          master={editingMaster}
          onClose={() => setEditingMaster(null)}
          onSave={onRefresh}
        />
      )}
    </>
  );
};

export default Masters;
