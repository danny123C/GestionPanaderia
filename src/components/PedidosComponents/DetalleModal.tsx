import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

type DetalleModalProps = {
  show: boolean;
  handleClose: () => void;
  detallePedidoList: Array<{
    IdDetalle: number;
    NombreTipoPan: string;
    Cantidad: number;
    PrecioUnitario: number;
    Subtotal: number;
  }>;
};

const DetalleModal: React.FC<DetalleModalProps> = ({
  show,
  handleClose,
  detallePedidoList,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Pedido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Tipo de Pan</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {detallePedidoList.map((detalle) => (
              <tr key={detalle.IdDetalle}>
                <td>{detalle.NombreTipoPan}</td>
                <td>{detalle.Cantidad}</td>
                <td>
                  {detalle.PrecioUnitario.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td>
                  {detalle.Subtotal.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetalleModal;
