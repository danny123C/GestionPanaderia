import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavScroll from "./NavDropdown";
import IndexView from "../views/IndexView";
import ClientesView from "../views/ClientesView";
import CuentasView from "../views/CuentasView";
import TiposDePanes from "../views/TiposDePanes";
import ProduccionDiariaView from "../views/ProduccionDiariaView";
import DetallePedidosView from "../views/DetallePedidosView";
import PedidosView from "../views/PedidosView";
import BarChartView from "../views/BarChartView";

const Dashboard = () => {
  return (
    <>
      <NavScroll />
      <Routes>
        {/* Redirección inicial al index */}
        <Route path="/" element={<Navigate to="index" />} />
        <Route path="index" element={<IndexView />} />
        <Route path="clientes" element={<ClientesView />} />
        <Route path="cuentas" element={<CuentasView />} />
        <Route path="tipos-panes" element={<TiposDePanes />} />
        <Route path="produccion-diaria" element={<ProduccionDiariaView />} />
        <Route path="detallePedidos/" element={<DetallePedidosView />} />
        <Route
          path="detallePedidos/:idPedido"
          element={<DetallePedidosView />}
        />
        <Route path="pedidos" element={<PedidosView />} />
        <Route path="barchart" element={<BarChartView />} />
        {/* Ruta para páginas no encontradas en el Dashboard */}
        <Route path="*" element={<Navigate to="index" />} />
      </Routes>
    </>
  );
};

export default Dashboard;
