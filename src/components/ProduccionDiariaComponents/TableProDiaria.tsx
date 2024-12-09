import { useState } from "react";
import { useProDiariaPanContext } from "../../context/ProDiariaContext";
import Table from "react-bootstrap/Table";
import DeleteButton from "../DeleteButton";
import EditButton from "./EditButton";
import { usePanContext } from "../../context/PanContext";
import "../Tables.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
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

function TableProDiaria() {
  const {
    proDiariaPanesList,
    deleteProduccionDiaria,
    editProduccionDiaria,
    handleNext,
    handlePrevious,
    offset,
    limit,
    total,
  } = useProDiariaPanContext();
  const { tiposPanesList, getListTiposPanes } = usePanContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<number | null>(null);
  const currentPage = Math.floor(offset / limit) + 1; // Página actual
  const totalPages = Math.ceil(total / limit); // Total de páginas
  const handleShowDetails = async (idProduccion: number) => {
    await getListTiposPanes(idProduccion);
    setSelectedPedido(idProduccion);
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
                <th>Tipo de Pan</th>
                <th>Cantidad</th>
                <th>Pan Faltante</th>
                <th>Pan Sobrante</th>
                <th>Fecha</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {proDiariaPanesList.length > 0 ? (
                proDiariaPanesList.map((pan) => (
                  <tr key={pan.IdProduccion}>
                    <td>{pan.IdProduccion}</td>
                    <td>{pan.NombreDelPan}</td>
                    <td>{pan.Cantidad} </td>
                    <td>{pan.PanFaltante}</td>
                    <td>{pan.PanSobrante} </td>
                    <td>{formatFecha(pan.Fecha)} </td>
                    <td>{pan.Observaciones} </td>
                    <td>
                      <DeleteButton
                        onDelete={() =>
                          deleteProduccionDiaria(pan.IdProduccion)
                        }
                      />
                    </td>
                    <td>
                      <EditButton item={pan} onEdit={editProduccionDiaria} />{" "}
                    </td>
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
    </>
  );
}

export default TableProDiaria;
