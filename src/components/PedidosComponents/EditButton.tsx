import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { TipoPedidos } from "../../context/PedidoContext";
import { useClienteContext } from "../../context/ClienteContext";

type EditButtonProps = {
  item: TipoPedidos;
  onEdit: (id: number, idCliente: number, fechaPedido: string) => void;
};

const EditButton: React.FC<EditButtonProps> = ({ item, onEdit }) => {
  const { clientesList } = useClienteContext();
  const [show, setShow] = React.useState(false);
  const [idCliente, setIdCliente] = React.useState(item.IdCliente);
  const [fechaPedido, setFechaPedido] = React.useState(item.FechaPedido);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (!idCliente) {
      Swal.fire("Error", "Debe escoger un cliente.", "error");
      return;
    }
    if (!fechaPedido) {
      Swal.fire("Error", "Debe seleccionar una fecha de pedido.", "error");
      return;
    }
    try {
      onEdit(item.IdPedido, idCliente, fechaPedido);
      handleClose();

      Swal.fire({
        title: "Pedido actualizado con éxito!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `No se logró actualizar el pedido <strong>${item.IdPedido}</strong>!`,
        footer: error.message,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <Button variant="link" onClick={handleShow} style={{ padding: 0 }}>
        <FontAwesomeIcon
          icon={faPenToSquare}
          style={{ color: "#007bff", fontSize: "1.3rem" }}
        />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Select
                aria-label="Selecciona un cliente"
                value={idCliente}
                onChange={(e) => setIdCliente(Number(e.target.value))}
                required
              >
                <option value="" disabled>
                  Selecciona un cliente
                </option>
                {clientesList.map((cliente) => (
                  <option key={cliente.IdCliente} value={cliente.IdCliente}>
                    {cliente.Nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formFechaPedido" className="mt-3">
              <Form.Label>Fecha De Pedido</Form.Label>
              <Form.Control
                type="date"
                value={fechaPedido}
                onChange={(e) => setFechaPedido(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!idCliente || !fechaPedido}
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditButton;
