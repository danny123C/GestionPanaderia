import TableComponent from "../components/Table"; // Asegúrate de que la ruta sea correcta
import AddTipoPanForm from "../components/Form";
import { PanProvider } from "../context/PanContext";

const TiposDePanes: React.FC = () => {
  return (
    <>
      <PanProvider>
        <AddTipoPanForm />
        <TableComponent />
      </PanProvider>
    </>
  );
};

export default TiposDePanes;
