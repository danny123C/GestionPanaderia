import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useLoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
function NavScroll() {
  const { logout } = useLoginContext(); // Usamos el contexto para logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llamamos al método logout
    navigate("/login"); // Redirigimos a login después de cerrar sesión
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>Opciones</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/dashboard/index">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard/cuentas">
              Cuentas
            </Nav.Link>
            <NavDropdown title="Panes" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/dashboard/tipos-panes">
                Tipos De Panes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/dashboard/produccion-diaria">
                Produccion Diaria
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Pedidos" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/dashboard/clientes">
                Clientes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/dashboard/pedidos">
                Total De Pedidos
              </NavDropdown.Item>

              <NavDropdown.Item />
            </NavDropdown>
            <Nav.Link as={Link} to="/dashboard/barChart">
              Metricas
            </Nav.Link>
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          <Button variant="outline-danger" onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
