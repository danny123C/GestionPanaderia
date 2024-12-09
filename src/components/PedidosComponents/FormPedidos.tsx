import { usePedidosContext } from "../../context/PedidoContext";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useClienteContext } from "../../context/ClienteContext";
import "../Forms.css";
const MySwal = withReactContent(Swal);

function AddPedidoForm() {
  const { addPedidos } = usePedidosContext(); // **Uso del Contexto:** Patrón Context API
  const { clientesList } = useClienteContext();

  const [idCliente, setIdCliente] = useState(1);
  const [fechaPedido, setFechaPedido] = useState("");

  const limpiarCampos = () => {
    setIdCliente(0);
    setFechaPedido("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await addPedidos(idCliente, fechaPedido);
      // Obtener el nombre del cliente seleccionado
      const clienteSeleccionado = clientesList.find(
        (cliente) => cliente.IdCliente === idCliente
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: `El cliente "${clienteSeleccionado?.Nombre}" fue registrado con éxito!`,
        showConfirmButton: false,
        timer: 1500,
      });
      limpiarCampos();
    } catch (error: any) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        html: `No se logró añadir al Cliente <strong>${idCliente}</strong>!`,
        footer: error.message,
        timer: 2000,
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-responsive">
        <form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Seleccione Cliente</InputGroup.Text>
            <Form.Select
              aria-label="Selecciona un Cliente"
              value={idCliente ?? ""}
              onChange={(e) => setIdCliente(Number(e.target.value))}
              required
            >
              <option value="">Selecciona un Cliente</option>
              {clientesList.map((ClientePan) => (
                <option key={ClientePan.IdCliente} value={ClientePan.IdCliente}>
                  {ClientePan.Nombre}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Fecha De Pedido </InputGroup.Text>
            <Form.Control
              type="date"
              placeholder=""
              value={fechaPedido}
              onChange={(e) => setFechaPedido(e.target.value)}
              required
            />
          </InputGroup>{" "}
          <Button variant="primary" type="submit">
            + Pedido
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddPedidoForm;
