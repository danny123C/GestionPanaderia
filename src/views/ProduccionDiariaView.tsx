import TableProDiaria from "../components/ProduccionDiariaComponents/TableProDiaria"; // Asegúrate de que la ruta sea correcta
import FormProDiaria from "../components/ProduccionDiariaComponents/FormProDiaria";
import { ProPanProvider } from "../context/ProDiariaContext";
import { PanProvider } from "../context/PanContext";
import React from "react";
import { PedidosProvider } from "../context/PedidoContext";

const ProduccionDiariaView: React.FC = () => {
  return (
    <>
      <PedidosProvider>
        <PanProvider>
          <ProPanProvider>
            <FormProDiaria />
            <TableProDiaria />
          </ProPanProvider>
        </PanProvider>
      </PedidosProvider>
    </>
  );
};

export default ProduccionDiariaView;
