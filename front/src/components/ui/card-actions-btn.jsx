import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const CardActionsBtn = ({ onEdit, onDelete }) => {
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
