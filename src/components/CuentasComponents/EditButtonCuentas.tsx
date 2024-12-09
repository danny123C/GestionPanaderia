import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

interface EditButtonProps {
  item: any; // La cuenta que se está editando
  onEdit: (
    IdPedido: number,
    Pagado: boolean,
    Abono: number,
    Observaciones: string
  ) => void;
}

const EditButton: React.FC<EditButtonProps> = ({ item, onEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [Pagado, setPagado] = useState(item.Pagado);
  const [Abono, setAbono] = useState(item.Abono); // Solo editamos estos campos
  const [Observaciones, setObservaciones] = useState(item.Observaciones);
  const handleSubmit = () => {
    onEdit(
      item.IdPedido, // El IdPedido se mantiene en el backend
      Pagado,
      Abono,
      Observaciones
    );
    try {
      Swal.fire({
        title: "Cuenta actualizado con éxito!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `No se logró actualizar el pedido !`,
        footer: error.message,
        timer: 2000,
      });
    }
    setShowModal(false);
  };

  return (
    <>
      <Button variant="link" onClick={() => setShowModal(true)}>
        <FontAwesomeIcon
          icon={faPenToSquare}
          style={{ color: "#007bff", fontSize: "1.3rem" }}
        />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Abono */}
            <Form.Group controlId="formAbono">
              <Form.Label>Abono</Form.Label>
              <div className="d-flex align-items-center">
                <span>{formatCurrency(Abono)}</span>{" "}
                {/* Mostrar el valor formateado */}
                <Form.Control
                  type="number"
                  value={Abono}
                  aria-describedby="basic-addon1"
                  onChange={(e) => setAbono(Number(e.target.value))}
                  style={{ marginLeft: "10px" }}
                />
              </div>
            </Form.Group>
            {/* Observaciones */}
            <Form.Group controlId="formObservaciones">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                type="text"
                value={Observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </Form.Group>

            {/* Pagado */}
            <Form.Group controlId="formPagado">
              <Form.Label>Pagado</Form.Label>
              <Form.Check
                type="checkbox"
                checked={Pagado}
                onChange={(e) => setPagado(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditButton;
