import TableCuentas from "../components/CuentasComponents/TableCuentas";
import { CuentasProvider } from "../context/CuentasContext";
import { PedidosProvider } from "../context/PedidoContext";
function CuentasView() {
  return (
    <PedidosProvider>
      <CuentasProvider>
        <TableCuentas></TableCuentas>
      </CuentasProvider>
    </PedidosProvider>
  );
}

export default CuentasView;
