import Swal from "sweetalert2";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Axios from "axios";

// Define el tipo de los datos del login
export type TypoLogin = {
  Id: number;
  Usuario: string;
  Contraseña: string; // Nota: nunca se debe exponer la contraseña, aquí es solo una referencia del tipo.
};

// Define el tipo de contexto que manejará las funciones y datos del login
type LoginContextType = {
  loginList: TypoLogin[]; // Lista de datos de usuarios (puedes adaptarla según necesidades)
  logeer: (Usuario: string, Contraseña: string) => Promise<void>; // Método para iniciar sesión
  logout: () => void; // Método para cerrar sesión
};

// Crea el contexto inicial con un valor por defecto `undefined`
export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);

// Define el componente proveedor del contexto
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  // Estado local para almacenar información del login
  const [loginList, setLoginList] = useState<TypoLogin[]>([]);

  /**
   * Método para iniciar sesión (login)
   * Envía las credenciales al backend y maneja la autenticación
   */
  const logeer = async (usuario: string, contraseña: string) => {
    try {
      // Realiza una solicitud POST al endpoint de login
      const response = await Axios.post("http://localhost:3000/api/login", {
        Usuario: usuario,
        Contraseña: contraseña,
      });

      // Extrae el token del backend (asegúrate de que el backend lo envíe)
      const token = response.data.token;

      // Guarda el token en el almacenamiento local del navegador
      localStorage.setItem("token", token);

      // Opcional: actualiza el estado con datos adicionales del usuario si es necesario

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `¡Bienvenido, ${usuario}!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error: any) {
      // Muestra una alerta si ocurre un error durante el login
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `No se pudo iniciar sesión con el usuario ${usuario}.`,
      });
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    }
  };

  /**
   * Método para cerrar sesión (logout)
   * Elimina el token del almacenamiento local y limpia el estado relacionado
   */
  const logout = () => {
    // Elimina el token del almacenamiento local
    localStorage.removeItem("token");

    // Limpia el estado (puedes realizar más acciones si es necesario)
    setLoginList([]);

    // Notifica al usuario que la sesión se ha cerrado
    Swal.fire({
      icon: "info",
      title: "Sesión cerrada",

      text: "Has cerrado sesión correctamente.",
    });
  };

  /**
   * Efecto para manejar autenticación inicial al cargar la aplicación
   * Verifica si hay un token guardado y realiza validaciones iniciales
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Usuario autenticado con token:", token);
      // Opcional: puedes realizar una validación del token con el backend aquí
    }
  }, []);

  // Proporciona el contexto a los componentes hijos
  return (
    <LoginContext.Provider
      value={{
        loginList,
        logeer,
        logout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Hook personalizado para usar el contexto del login
export const useLoginContext = () => {
  const context = useContext(LoginContext);

  // Si el contexto no está definido, lanza un error (asegúrate de envolver con el proveedor)
  if (!context) {
    throw new Error(
      "useLoginContext debe ser usado dentro de un LoginProvider"
    );
  }

  return context;
};
