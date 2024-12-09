import { useEffect } from "react";
import { useDetallePedidosContext } from "../../context/DetallePedidoContext";
import Table from "react-bootstrap/Table";
import DeleteButton from "../DeleteButton";
import "../Tables.css";
const TableDetallePedido = ({ idPedido }: { idPedido: number }) => {
  const { detallePedidoList, getDetallePedido, deleteDetallePedido } =
    useDetallePedidosContext();

  // useEffect se ejecutará una vez cuando el componente se monte
  useEffect(() => {
    getDetallePedido(idPedido);
  }, [idPedido, getDetallePedido]); // Dependencia de idPedido para asegurarse de que solo se ejecuta cuando cambia

  return (
    <div className="table-container">
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Tipo Pan</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {detallePedidoList.map((detalle) => (
              <tr key={detalle.IdDetalle}>
                <td>{detalle.IdDetalle}</td>
                <td>{detalle.NombreTipoPan}</td>
                <td>{detalle.Cantidad}</td>
                <td>{detalle.PrecioUnitario}</td>
                <td>{detalle.Subtotal}</td>
                <td>
                  <DeleteButton
                    onDelete={() => deleteDetallePedido(detalle.IdDetalle)}
                  />
                </td>

                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TableDetallePedido;
