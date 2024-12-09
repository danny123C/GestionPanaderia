import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { TipoPan } from "../context/PanContext"; // Asegúrate de ajustar la ruta según la ubicación de tu archivo

type EditButtonProps = {
  item: TipoPan; // Puedes hacer esto más genérico si deseas usarlo para otras entidades
  onEdit: (id: number, nombre: string, descripcion: string) => void;
};

const EditButton: React.FC<EditButtonProps> = ({ item, onEdit }) => {
  const [show, setShow] = React.useState(false);
  const [nombre, setNombre] = React.useState(item.Nombre);
  const [descripcion, setDescripcion] = React.useState(item.Descripcion);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (nombre.trim() === "" || descripcion.trim() === "") {
      Swal.fire("Error", "Todos los campos son obligatorios.", "error");
      return;
    }

    onEdit(item.IdTipoPan, nombre, descripcion);
    handleClose();
    Swal.fire("Éxito", "El registro ha sido editado.", "success");
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tipo de Pan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa el nombre del pan"
              />
            </Form.Group>

            <Form.Group controlId="formDescripcion" className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ingresa la descripción del pan"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditButton;
