import { useClienteContext } from "../../context/ClienteContext";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../Forms.css";
const MySwal = withReactContent(Swal);

function AddClienteForm() {
  const { addClientes } = useClienteContext(); // **Uso del Contexto:** Patrón Context API
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const limpiarCampos = () => {
    setNombre("");
    setTelefono("");
    setEmail("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await addClientes(nombre, Number(telefono), email);
      MySwal.fire({
        title: "Registro Exitoso!",
        icon: "success",
        text: `El tipo de pan "${nombre}" fue registrado con éxito!`,
        showConfirmButton: false,
        timer: 2500,
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
            <InputGroup.Text id="basic-addon1">
              Nombre del Cliente:
            </InputGroup.Text>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Danny Francisco Coro."
              aria-describedby="basic-addon1"
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              Numero de Telefono:
            </InputGroup.Text>
            <Form.Control
              type="number"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="0986706344"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Email:</InputGroup.Text>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dannycoro@gmail.com."
            />
          </InputGroup>

          <Button variant="primary" type="submit">
            + Cliente
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddClienteForm;
