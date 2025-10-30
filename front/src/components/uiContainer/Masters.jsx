import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardListMaster from '../ui/card-list-master';
import EditMasterModal from '../modals/EditMasterModal';
import AddMasterModal from '../modals/AddMasterModal';

const Masters = ({ masters, category, subcategory, onRefresh, buttonText }) => {
  const navigate = useNavigate();
  const [editingMaster, setEditingMaster] = useState(null);
  const [addMaster, setAddMaster] = useState(false);

  const handleMasterInfo = (id) => {
    navigate(`/services/${category}/${subcategory}/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить этого мастера?")) return;

    try {
      const res = await fetch(`/api/Masters/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Ошибка при удалении");
      onRefresh();
    } catch (err) {
      console.error("Ошибка при удалении:", err);
    }
  };

  const handleEdit = (master) => {
    setEditingMaster(master);
  };

  const handleAdd = () => {
    setAddMaster(true);
    console.log("Add: master");
  };
  console.log("all masters", masters);
  return (
    <>
      <CardListMaster
        masters={masters}
        onLearnMore={handleMasterInfo}
        onDelete={handleDelete}
        onEdit={handleEdit}
        buttonText={buttonText}
        onAdd={handleAdd}
      />

      {editingMaster && (
        <EditMasterModal
          master={editingMaster}
          onClose={() => setEditingMaster(null)}
          onSave={onRefresh}
        />
      )}

      {addMaster && (
        <AddMasterModal
          onClose={() => setAddMaster(false)}
          onSave={onRefresh}
        />
      )}
    </>
  );
};

export default Masters;
