import TablePedidoComponent from "../components/PedidosComponents/TablePedidos";
import AddPedidoForm from "../components/PedidosComponents/FormPedidos";
import { PedidosProvider } from "../context/PedidoContext";
import { ClienteProvider } from "../context/ClienteContext";
import { DetallePedidosProvider } from "../context/DetallePedidoContext"; // Corregido

function PedidosView() {
  return (
    <ClienteProvider>
      <PedidosProvider>
        <DetallePedidosProvider>
          <AddPedidoForm />
          <TablePedidoComponent />
        </DetallePedidosProvider>
      </PedidosProvider>
    </ClienteProvider>
  );
}

export default PedidosView;
