import AccordionView from "../components/IndexComponents/Accordion";
//import AddClienteForm from "../components/ClientesComponents/FormCliente";
import { ClienteViewProvider } from "../context/IndexContext";

function IndexView() {
  return (
    <ClienteViewProvider>
      <AccordionView></AccordionView>
    </ClienteViewProvider>
  );
}

export default IndexView;
