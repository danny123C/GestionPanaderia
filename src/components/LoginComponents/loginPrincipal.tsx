import { useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

function Login() {
  const { logeer } = useLoginContext();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const limpiarCampos = () => {
    setUsuario("");
    setContraseña("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await logeer(usuario, contraseña);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `¡Bienvenido, ${usuario}!`,
        showConfirmButton: false,
        timer: 1500,
      });

      limpiarCampos();
      navigate("/dashboard");
    } catch (error: any) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: `No se pudo iniciar sesión con el usuario ${usuario}.`,
      });
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <div>
      <div className="form-container">
        <div
          className="form-responsive"
          style={{
            maxWidth: "400px",
            margin: "50px auto",
            textAlign: "center",
            backgroundColor: "#F5F5F5", // Fondo claro
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            fontFamily: "'Poppins', sans-serif",
            border: "1px solid #E0E0E0", // Borde sutil
          }}
        >
          <h2 style={{ color: "#4E4E50", fontWeight: "700" }}>Bienvenido</h2>
          <p style={{ color: "#6C6C6C" }}>Accede a tu cuenta para continuar</p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="username"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#4E4E50",
                  fontWeight: "600",
                }}
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  boxSizing: "border-box",
                  border: "1px solid #C0C0C0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  backgroundColor: "#FFFFFF",
                }}
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#4E4E50",
                  fontWeight: "600",
                }}
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  boxSizing: "border-box",
                  border: "1px solid #C0C0C0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  backgroundColor: "#FFFFFF",
                }}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#4E4E50", // Botón gris oscuro
                color: "white",
                padding: "12px 25px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#3C3C3E")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#4E4E50")
              }
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
