import { useParams } from "react-router-dom";
import FormAniadirPedido from "../components/PedidosComponents/FormAniadirPedido";
import { DetallePedidosProvider } from "../context/DetallePedidoContext";
import { PanProvider } from "../context/PanContext";
import TableDetallePedido from "../components/PedidosComponents/TableDetallePedido";

const DetallePedidosView = () => {
  const { idPedido } = useParams<{ idPedido: string }>(); // Obtener idPedido desde la URL

  if (!idPedido) {
    return <div>No se encontró el pedido.</div>;
  }

  return (
    <PanProvider>
      <DetallePedidosProvider>
        <div>
          {/* Pasar el idPedido como prop al formulario */}
          <FormAniadirPedido idPedido={Number(idPedido)} />
          <TableDetallePedido idPedido={Number(idPedido)}></TableDetallePedido>
        </div>
      </DetallePedidosProvider>
    </PanProvider>
  );
};

export default DetallePedidosView;
