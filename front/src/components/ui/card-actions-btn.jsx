import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const CardActionsBtn = ({ onEdit, onDelete }) => {
  const role = localStorage.getItem("role");

    if (role === "Client") {
    return null; 
  }

  return (
    <div className="card-actions">
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
