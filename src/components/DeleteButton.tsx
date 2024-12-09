import React from "react";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type DeleteButtonProps = {
  onDelete: () => void;
  label?: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  const handleClick = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
        Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
      }
    });
  };

  return (
    <Button variant="link" onClick={handleClick}>
      {/* {<FontAwesomeIcon icon={faTrash} />} {label} */}
      <FontAwesomeIcon
        icon={faTrash}
        style={{ color: "#f34336", fontSize: "1.3rem" }}
      />
    </Button>
  );
};

export default DeleteButton;
