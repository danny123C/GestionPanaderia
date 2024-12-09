import { usePanContext } from "../context/PanContext";
import Table from "react-bootstrap/Table";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import "./Tables.css";

function TableComponent() {
  const { tiposPanesList, deleteTipoPan, editTipoPan } = usePanContext();

  return (
    <div className="table-container">
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {tiposPanesList.length > 0 ? (
              tiposPanesList.map((pan) => (
                <tr key={pan.IdTipoPan}>
                  <td>{pan.IdTipoPan}</td>
                  <td>{pan.Nombre}</td>
                  <td>{pan.Descripcion}</td>
                  <td>
                    <DeleteButton
                      onDelete={() => deleteTipoPan(pan.IdTipoPan)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No hay tipos de panes disponibles
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TableComponent;
