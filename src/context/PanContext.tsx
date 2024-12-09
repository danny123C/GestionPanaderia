import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Axios from "axios";
import Swal from "sweetalert2";

// Definir el tipo de un tipo de pan
export type TipoPan = {
  IdTipoPan: number;
  Nombre: string;
  Descripcion: string;
};

// Definir el tipo del contexto
type PanContextType = {
  tiposPanesList: TipoPan[];
  getListTiposPanes: (idProduccion: number) => void;
  addTipoPan: (nombre: string, descripcion: string) => Promise<void>;
  deleteTipoPan: (id: number) => Promise<void>; // Añadir la función de eliminar
  editTipoPan: (
    id: number,
    nombre: string,
    descripcion: string
  ) => Promise<void>; // Nueva función de edición
};

// Crear el contexto con un valor por defecto
const PanContext = createContext<PanContextType | undefined>(undefined);

// Crear un proveedor para el contexto
export const PanProvider = ({ children }: { children: ReactNode }) => {
  const [tiposPanesList, setTiposPanesList] = useState<TipoPan[]>([]);

  // Función para obtener la lista de tipos de panes
  const getListTiposPanes = () => {
    Axios.get<TipoPan[]>("http://localhost:3000/api/listTiposPanes")
      .then((response) => {
        setTiposPanesList(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de panes:", error.message);
      });
  };

  // Función para añadir un nuevo tipo de pan
  const addTipoPan = async (nombre: string, descripcion: string) => {
    try {
      await Axios.post("http://localhost:3000/api/addTipoPan", {
        Nombre: nombre,
        Descripcion: descripcion,
      });
      getListTiposPanes(); // Actualizar la lista después de añadir
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        html: `No se pudo añadir a <strong>${nombre}</strong>!.`,
      });
      console.error("Error al añadir tipo de pan:", error.message);
      throw error; // Propagar el error para manejarlo en el componente
    }
  };

  // Función para eliminar un tipo de pan
  const deleteTipoPan = async (id: number) => {
    try {
      await Axios.delete(`http://localhost:3000/api/deleteTipoPan/${id}`);
      getListTiposPanes(); // Actualizar la lista después de eliminar
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        html: `No se pudo Eliminar el Pan!.`,
      });
      console.error("Error al eliminar tipo de pan:", error.message);
      throw error; // Propagar el error para manejarlo en el componente
    }
  };

  const editTipoPan = async (
    id: number,
    nombre: string,
    descripcion: string
  ) => {
    try {
      await Axios.put(`http://localhost:3000/api/editTipoPan/${id}`, {
        Nombre: nombre,
        Descripcion: descripcion,
      });
      getListTiposPanes(); // Actualizar la lista después de editar
    } catch (error: any) {
      console.error("Error al editar tipo de pan:", error.message);
      throw error; // Propagar el error para manejarlo en el componente
    }
  };
  // Obtener la lista al montar el proveedor
  useEffect(() => {
    getListTiposPanes();
  }, []);
  return (
    <PanContext.Provider
      value={{
        tiposPanesList,
        getListTiposPanes,
        addTipoPan,
        deleteTipoPan,
        editTipoPan,
      }}
    >
      {children}
    </PanContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const usePanContext = () => {
  const context = useContext(PanContext);
  if (!context) {
    throw new Error("usePanContext debe ser usado dentro de un PanProvider");
  }
  return context;
};
