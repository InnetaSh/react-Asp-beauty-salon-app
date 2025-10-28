import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';

const CardActionsBtn = ({ onEdit, onDelete,onAdd }) => {
  const role = localStorage.getItem("role") ;
  const token = localStorage.getItem("token");
console.log("role in card actions btn:", role);
    if (role === "Client" || token === null) {
      
    return null; 
  }

  return (
    <div className="card-actions">
          {onAdd && (
        <button onClick={onAdd} className="card-action-button add">
          <FaPlus />
        </button>
      )}
      {onEdit && (
        <button onClick={onEdit} className="card-action-button edit">
          <FaEdit />
        </button>
      )}
      {onDelete && (
        <button onClick={onDelete} className="card-action-button delete">
          <FaTrashAlt />
        </button>
      )}
    </div>
  );
};

export default CardActionsBtn;
