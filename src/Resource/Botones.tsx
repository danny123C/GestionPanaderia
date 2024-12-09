import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export function EditIconButton({ onClick }) {
  return (
    <button onClick={onClick} className="icon-button edit-button">
      <FontAwesomeIcon icon={faEdit} />
    </button>
  );
}

export function DeleteIconButton({ onClick }) {
  return (
    <button onClick={onClick} className="icon-button delete-button">
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}
