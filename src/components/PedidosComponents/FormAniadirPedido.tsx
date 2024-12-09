import React, { useState } from "react";
import { useDetallePedidosContext } from "../../context/DetallePedidoContext";
import Swal from "sweetalert2";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { usePanContext } from "../../context/PanContext";
import Button from "react-bootstrap/Button";
import "../Forms.css";
// Definir las props que recibe el componente
interface FormAniadirPedidoProps {
  idPedido: number;
}

const FormAniadirPedido: React.FC<FormAniadirPedidoProps> = ({ idPedido }) => {
  const { addDetallePedido } = useDetallePedidosContext(); // Contexto para agregar detalle
  const [idTipoPan, setIdTipoPan] = useState<number | "">("");
  const [cantidad, setCantidad] = useState<number | "">("");
  const [precioUnitario, setPrecioUnitario] = useState<number | "">("");

  const { tiposPanesList } = usePanContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (idTipoPan && cantidad && precioUnitario) {
      try {
        await addDetallePedido(
          idPedido,
          Number(idTipoPan),
          Number(cantidad),
          Number(precioUnitario)
          // Number(cantidad) * Number(precioUnitario)
        );

        // Limpiar campos después de añadir
        setIdTipoPan("");
        setCantidad("");
        setPrecioUnitario("");

        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Detalle del pedido añadido con éxito.",
        });
      } catch (error) {
        console.error("Error al añadir detalle del pedido", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo añadir el detalle del pedido.",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Por favor, completa todos los campos.",
      });
    }
  };

  const handleTotalPedidoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPrecioUnitario(isNaN(value) ? 0.0 : value);
  };
  return (
    <div className="form-container">
      <h4 style={{ textAlign: "center" }}>Agregar Detalles a Pedidos</h4>

      <div className="form-responsive">
        <form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Tipo de Pan</InputGroup.Text>
            <Form.Select
              aria-label="Selecciona un tipo de pan"
              value={idTipoPan ?? ""}
              onChange={(e) => setIdTipoPan(Number(e.target.value))}
              required
            >
              <option value="" disabled>
                Selecciona un tipo de pan
              </option>
              {tiposPanesList.map((tipoPan) => (
                <option key={tipoPan.IdTipoPan} value={tipoPan.IdTipoPan}>
                  {tipoPan.Nombre}
                </option>
              ))}
            </Form.Select>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Cantidad</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="0"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Total Pedido ($)</InputGroup.Text>
            <Form.Control
              type="number"
              value={precioUnitario} // Formatear con dos decimales
              onChange={handleTotalPedidoChange}
              placeholder="0.00"
              aria-describedby="basic-addon1"
              required
            />
          </InputGroup>
          <Button variant="primary" type="submit">
            + Detalle
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormAniadirPedido;
