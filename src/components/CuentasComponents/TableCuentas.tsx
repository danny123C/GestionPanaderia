import { useCuentasContext } from "../../context/CuentasContext";
import Table from "react-bootstrap/Table";

import EditButton from "./EditButtonCuentas.tsx";
import formatFecha from "../../Resource/Resorce.tsx";
import "../Tables.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
function TableCuentas() {
  const {
    cuentasList,
    handleNext,
    handlePrevious,
    offset,
    limit,
    total,
    editCuentas,
  } = useCuentasContext(); // **Uso del Contexto**

  const currentPage = Math.floor(offset / limit) + 1; // Página actual
  const totalPages = Math.ceil(total / limit); // Total de páginas

  return (
    <div className="table-container">
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Abono</th>
              <th>Pagado</th>
              <th>Total</th>
              <th>Observaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cuentasList.length > 0 ? (
              cuentasList.map((cuenta, index) => (
                <tr key={index}>
                  <td>{offset + index + 1}</td> {/* Índice global con offset */}
                  <td>{formatFecha(cuenta.FechaPedido)}</td>
                  <td>{cuenta.NombreCliente}</td>
                  <td>
                    {cuenta.Abono !== null
                      ? cuenta.Abono.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "$0.00"}
                  </td>
                  <td style={{ color: cuenta.Pagado ? "green" : "red" }}>
                    {cuenta.Pagado ? "Sí" : "No"}
                  </td>
                  <td>{cuenta.TotalPedido}</td>
                  <td>{cuenta.Observaciones}</td>
                  <td>
                    <EditButton item={cuenta} onEdit={editCuentas} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  No hay cuentas disponibles
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
  );
}

export default TableCuentas;
