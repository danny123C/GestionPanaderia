import { useClienteContext } from "../../context/ClienteContext";
import Table from "react-bootstrap/Table";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import "../Tables.css";
function TableClientes() {
  const { clientesList, deleteClientes, editCliente } = useClienteContext(); // **Uso del Contexto:** Patrón Context API

  return (
    <div className="table-container">
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Telefono</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {clientesList.length > 0 ? (
              clientesList.map((cliente) => (
                <tr key={cliente.IdCliente}>
                  <td>{cliente.IdCliente}</td>
                  <td>{cliente.Nombre}</td>
                  <td>{cliente.Telefono}</td>
                  <td>{cliente.Email} </td>
                  <td>
                    <DeleteButton
                      onDelete={() => deleteClientes(cliente.IdCliente)}
                    />
                  </td>
                  <td> </td>
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
    </div>
  );
}

export default TableClientes;
