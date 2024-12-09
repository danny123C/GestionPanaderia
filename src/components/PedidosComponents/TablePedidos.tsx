import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { usePedidosContext } from "../../context/PedidoContext";
import { useDetallePedidosContext } from "../../context/DetallePedidoContext";
import DeleteButton from "../DeleteButton";
import DetalleModal from "./DetalleModal"; // Importa tu componente DetalleModal
import EditButton from "./EditButton";
import "../Tables.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowLeftLong,
  faArrowRightLong,
  faAddressBook,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
const formatFecha = (fecha: string) => {
  const date = new Date(fecha);

  // Ajustar la fecha agregando la compensación de la zona horaria
  const adjustedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  );

  const year = adjustedDate.getFullYear();
  const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
  const day = String(adjustedDate.getDate()).padStart(2, "0"); // Asegurarse de que siempre tenga dos dígitos

  return `${year}/${month}/${day}`;
};

const TablePedidoComponent = () => {
  const {
    pedidosList,
    listSumaTotalPedidos,
    deletePedidos,
    editPedido,
    getSumaTotalPedidos,
    handleNext,
    handlePrevious,
    offset,
    limit,
    total,
  } = usePedidosContext();
  const { detallePedidoList, getDetallePedido } = useDetallePedidosContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<number | null>(null);
  const currentPage = Math.floor(offset / limit) + 1; // Página actual
  const totalPages = Math.ceil(total / limit); // Total de páginas
  const handleShowDetails = async (idPedido: number) => {
    await getDetallePedido(idPedido);
    setSelectedPedido(idPedido);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPedido(null);
  };

  return (
    <>
      <div className="table-container">
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidosList.length > 0 ? (
                pedidosList.map((pedido) => (
                  <tr key={pedido.IdPedido}>
                    <td>{pedido.IdPedido}</td>
                    <td>{pedido.NombreCliente}</td>
                    <td>{formatFecha(pedido.FechaPedido)}</td>
                    <td>
                      {
                        pedido.TotalPedido !== null
                          ? pedido.TotalPedido.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })
                          : "N/A" // O algún texto que prefieras para representar el valor nulo
                      }
                    </td>

                    <td className="text-center">
                      <div className="d-flex justify-content-around align-items-center">
                        <EditButton item={pedido} onEdit={editPedido} />
                        <DeleteButton
                          onDelete={() => deletePedidos(pedido.IdPedido)}
                        />
                        <Button
                          variant="link"
                          onClick={() => handleShowDetails(pedido.IdPedido)}
                        >
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            style={{ color: "#f1e11c", fontSize: "1.3rem" }}
                          />
                        </Button>
                        <Link
                          to={{
                            pathname: `/dashboard/detallePedidos/${pedido.IdPedido}`,
                          }}
                          className="btn btn-link"
                        >
                          <FontAwesomeIcon
                            icon={faAddressBook}
                            style={{ color: "#18bb31", fontSize: "1.3rem" }}
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No hay pedidos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        {/* Controles de Paginación */}
        <div className="pagination-container">
          <button
            onClick={handlePrevious}
            disabled={offset === 0}
            className="pagination-button"
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </button>
          <span className="pagination-info">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={offset + limit >= total}
            className="pagination-button"
          >
            <FontAwesomeIcon
              icon={faArrowRightLong}
              style={{
                color: "#18bb31",
              }}
            />
          </button>
        </div>
      </div>
      <DetalleModal
        show={showModal}
        handleClose={handleCloseModal}
        detallePedidoList={detallePedidoList}
      />
    </>
  );
};

export default TablePedidoComponent;
