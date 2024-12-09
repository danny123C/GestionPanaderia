import React, { useState } from "react";
import { usePanContext } from "../context/PanContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Forms.css";
const MySwal = withReactContent(Swal);

function AddTipoPanForm() {
  const { addTipoPan } = usePanContext(); // **Uso del Contexto:** Patrón Context API
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const limpiarCampos = () => {
    setNombre("");
    setDescripcion("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await addTipoPan(nombre, descripcion);
      MySwal.fire({
        title: "Registro Exitoso!",
        icon: "success",
        text: `El tipo de pan "${nombre}" fue registrado con éxito!`,
        showConfirmButton: false,

        timer: 2000,
      });
      limpiarCampos();
    } catch (error: any) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        html: `No se logró añadir el tipo de pan <strong>${nombre}</strong>!`,
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
            <InputGroup.Text id="basic-addon1">Nombre del Pan:</InputGroup.Text>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Enrollado"
              aria-describedby="basic-addon1"
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              Descripción del Pan:
            </InputGroup.Text>
            <Form.Control
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Pan con dobleces relleno de mantequilla."
              required
            />
          </InputGroup>
          <Button variant="primary" type="submit">
            + Pan
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddTipoPanForm;
