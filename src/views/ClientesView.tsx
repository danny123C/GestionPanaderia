import TableClientes from "../components/ClientesComponents/TableClientes";
import AddClienteForm from "../components/ClientesComponents/FormCliente";
import { ClienteProvider } from "../context/ClienteContext";

function ClientesView() {
  return (
    <ClienteProvider>
      <AddClienteForm />
      <TableClientes></TableClientes>
    </ClienteProvider>
  );
}

export default ClientesView;
