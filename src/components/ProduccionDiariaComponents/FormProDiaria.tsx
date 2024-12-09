import React, { useState } from "react";
import { useProDiariaPanContext } from "../../context/ProDiariaContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { usePanContext } from "../../context/PanContext";
import "../Forms.css";
const MySwal = withReactContent(Swal);

function FormProDiaria() {
  const { addProduccionDiaria } = useProDiariaPanContext(); // **Uso del Contexto:** Patrón Context API

  const { tiposPanesList } = usePanContext();

  const [idTipoPan, setIdTipoPan] = useState(1);
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState("");
  const [panFaltante, setPanFaltante] = useState("");
  const [panSobrante, setPanSobrante] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const limpiarCampos = () => {
    setIdTipoPan(0);
    setCantidad("");
    setFecha("");
    setPanFaltante("");
    setPanSobrante("");
    setObservaciones("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await addProduccionDiaria(
        idTipoPan,
        cantidad,
        fecha,
        panFaltante,
        panSobrante,
        observaciones
      );
      MySwal.fire({
        title: "Registro Exitoso!",
        text: `El tipo de pan  fue registrado con éxito!`,
        icon: "success",
        timer: 2000,
      });
      limpiarCampos();
    } catch (error: any) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        html: `No se logró añadir el tipo de pan <strong>${cantidad}</strong>!`,
        footer: error.message,
        timer: 2000,
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-responsive">
        <form onSubmit={handleSubmit} className="InputGroup-responsive">
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
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Pan Faltante</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="0"
              value={panFaltante}
              onChange={(e) => setPanFaltante(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Pan Sobrante</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="0"
              value={panSobrante}
              onChange={(e) => setPanSobrante(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Fecha</InputGroup.Text>
            <Form.Control
              type="date"
              placeholder="Fecha de producción"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </InputGroup>{" "}
          <InputGroup className="mb-3">
            <InputGroup.Text>Observaciones</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder=""
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </InputGroup>
          <Button variant="primary" type="submit">
            + Produccion
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FormProDiaria;
