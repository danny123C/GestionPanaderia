import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import { useClienteViewContext } from "../../context/IndexContext";
import formatFecha from "../../Resource/Resorce.tsx";
import "../Tables.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
function AccordionView() {
  const {
    clientesViewList,
    produccionViewList,
    handleNext,
    handlePrevious,
    offset,
    limit,
    total,
  } = useClienteViewContext();

  const currentPage = Math.floor(offset / limit) + 1; // Página actual
  const totalPages = Math.ceil(total / limit); // Total de páginas
  return (
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Resumen Cuentas</Accordion.Header>
        <Accordion.Body>
          <div className="table-container">
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Observaciones</th>
                    <th>Pagado</th>
                    <th>Abono</th>
                    <th>Total</th>
                    {/*<th>Nobre Pan</th>*/}
                    <th>Total Panes</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesViewList.length > 0 ? (
                    clientesViewList.map((pan, index) => (
                      <tr key={pan.IdPedido}>
                        <td>{index + 1}</td> {/* Número de índice */}
                        <td>{formatFecha(pan.FechaPedido)}</td>
                        <td>{pan.NombreCliente}</td>
                        <td>{pan.Observaciones}</td>
                        <td style={{ color: pan.Pagado ? "green" : "red" }}>
                          {pan.Pagado ? "Sí" : "No"}
                        </td>
                        <td>
                          {
                            pan.Abono !== null
                              ? pan.Abono.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })
                              : "$0.00" // O algún texto que prefieras para representar el valor nulo
                          }
                        </td>
                        <td>
                          {
                            pan.TotalPedido !== null
                              ? pan.TotalPedido.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })
                              : "$0.00" // O algún texto que prefieras para representar el valor nulo
                          }
                        </td>
                        {/*<td>{pan.NombresPan}</td>*/}
                        <td>{pan.TotalCantidad} </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        No hay tipos de panes disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {/* Controles de Paginación */}
              <div className="pagination-container">
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
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Resumen Produccion Diaria</Accordion.Header>
        <Accordion.Body>
          <div className="table-container">
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Nombre De Pan </th>
                    <th>Cantidad</th>
                    <th>Pan Sobrante</th>
                    <th>Pan Faltante</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {produccionViewList.length > 0 ? (
                    produccionViewList.map((produ, index) => (
                      <tr key={produ.IdProduccion}>
                        <td>{index + 1}</td> {/* Número de índice */}
                        <td>{formatFecha(produ.Fecha)}</td>
                        <td>{produ.NombrePan}</td>
                        <td>{produ.Cantidad}</td>
                        <td>{produ.PanSobrante} </td>
                        <td>{produ.PanFaltante} </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        No hay tipos de panes disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            {/* Controles de Paginación */}
            <div className="pagination-container">
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
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionView;
