import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ProPan } from "../../context/ProDiariaContext";
import { usePedidosContext } from "../../context/PedidoContext";
import TiposDePanes from "../../views/TiposDePanes";
import { usePanContext } from "../../context/PanContext";

type EditButtonProps = {
  item: ProPan;
  onEdit: (
    IdProduccion: number,
    // IdTipoPan: number,
    Cantidad: string,
    Fecha: string,
    PanFaltante: string,
    PanSobrante: string,
    Observaciones: string
  ) => void;
};

const EditButton: React.FC<EditButtonProps> = ({ item, onEdit }) => {
  // const { tiposPanesList } = usePanContext();
  const { pedidosList } = usePedidosContext();
  const [show, setShow] = React.useState(false);
  // const [idTipoPan, setIdTipoPan] = React.useState(item.IdTipoPan);
  //const [nombreDelPan, setNombreDelPan] = React.useState(item.NombreDelPan);
  const [cantidad, setCantidad] = React.useState(item.Cantidad);
  const [fecha, setFecha] = React.useState(item.Fecha);
  const [panFaltante, setPanFaltante] = React.useState(item.PanFaltante);
  const [panSobrante, setPanSobrante] = React.useState(item.PanSobrante);
  const [observaciones, setObservaciones] = React.useState(item.Observaciones);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (!cantidad) {
      console.log(item.IdProduccion, cantidad);
      Swal.fire("Error", "Debe escoger un cliente.", "error");
      return;
    }
    try {
      onEdit(
        item.IdProduccion,
        cantidad,
        fecha,
        panFaltante,
        panSobrante,
        observaciones
      );
      console.log(item.IdProduccion, cantidad);
      handleClose();
      Swal.fire("Éxito", "Pedido actualizado con éxito.", "success");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `No se logró actualizar el pedido!!`,
        footer: error.message,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <Button variant="link" onClick={handleShow}>
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
            {/* <Form.Group>
              <Form.Select
                aria-label="Selecciona un cliente"
                value={idTipoPan}
                onChange={(e) => setIdTipoPan(Number(e.target.value))}
                required
              >
                <option value="" disabled>
                  Selecciona un cliente
                </option>
                {tiposPanesList.map((pan) => (
                  <option key={pan.IdTipoPan} value={pan.IdTipoPan}>
                    {pan.Nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group> */}

            <Form.Group controlId="formFechaPedido" className="mt-3">
              <Form.Label>Fecha De Pedido</Form.Label>
              <Form.Control
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Group>Cantidad</Form.Group>
              <Form.Control
                type="number"
                placeholder="0"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Group>Pan Faltante</Form.Group>
              <Form.Control
                type="number"
                placeholder="0"
                value={panFaltante}
                onChange={(e) => setPanFaltante(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Group>Pan Sobrante</Form.Group>
              <Form.Control
                type="number"
                placeholder="0"
                value={panSobrante}
                onChange={(e) => setPanSobrante(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Group>Observaciones</Form.Group>
              <Form.Control
                type="text"
                placeholder=""
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
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
