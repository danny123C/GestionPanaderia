import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import Axios from "axios";

export type ProPan = {
  IdProduccion: number;
  IdTipoPan: number;
  NombreDelPan: string;
  Cantidad: string;
  Fecha: string;
  PanFaltante: string;
  PanSobrante: string;
  Observaciones: string;
};
type ProDiariaPanContextType = {
  proDiariaPanesList: ProPan[];
  getLisProDiariaPanes: () => void;
  addProduccionDiaria: (
    IdTipoPan: number,
    Cantidad: string,
    Fecha: string,
    PanFaltante: string,
    PanSobrante: string,
    Observaciones: string
  ) => Promise<void>;
  deleteProduccionDiaria: (id: number) => Promise<void>; // Añadir la función de eliminar
  editProduccionDiaria: (
    IdProduccion: number,
    // IdTipoPan: number,

    Cantidad: string,
    Fecha: string,
    PanFaltante: string,
    PanSobrante: string,
    Observaciones: string
  ) => Promise<void>; // Nueva función de edición
  handleNext: () => void;
  handlePrevious: () => void;
  offset: number;
  limit: number;
  total: number;
};
const ProPanContext = createContext<ProDiariaPanContextType | undefined>(
  undefined
);

// Crear un proveedor para el contexto
export const ProPanProvider = ({ children }: { children: ReactNode }) => {
  const [proDiariaPanesList, setProDiariaPanesList] = useState<ProPan[]>([]);
  const [limit] = useState(15); // Número de registros por página
  const [offset, setOffset] = useState(0); // Registro inicial
  const [total, setTotal] = useState(0); // Total de registros (opcional)

  // Función para obtener la lista de tipos de panes
  const getLisProDiariaPanes = () => {
    Axios.get<{
      data: ProPan[];
      pagination: { limit: number; offset: number; total: number };
    }>(
      `http://localhost:3000/api/listProduccionDiaria?limit=${limit}&offset=${offset}`
    )
      .then((response) => {
        setProDiariaPanesList(response.data.data);
        setTotal(response.data.pagination.total); // Total de registros
      })
      .catch((error) => {
        console.error("Error al obtener la lista de panes:", error.message);
      });
  };
  const handleAxiosError = (error: any) => {
    console.error(
      "Error en la solicitud:",
      error.response?.data || error.message
    );
    throw error; // Si necesitas propagar el error
  };

  // Luego úsalo en cada operación
  const addProduccionDiaria = async (
    idTipoPan: number,
    cantidad: string,
    fecha: string,
    panFaltante: string,
    panSobrante: string,
    observaciones: string
  ) => {
    try {
      await Axios.post("http://localhost:3000/api/addProduccionDiaria", {
        IdTipoPan: idTipoPan,
        Cantidad: cantidad,
        Fecha: fecha,
        PanFaltante: panFaltante,
        PanSobrante: panSobrante,
        Observaciones: observaciones,
      });
      getLisProDiariaPanes(); // Actualizar la lista
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const deleteProduccionDiaria = async (id: number) => {
    try {
      await Axios.delete(
        `http://localhost:3000/api/deleteProduccionDiaria/${id}`
      );
      getLisProDiariaPanes();
    } catch (error: any) {
      console.error("error al eliminar Produccion diaria", error.message);
      throw error;
    }
  };

  const editProduccionDiaria = async (
    idProduccion: number,
    // idTipoPan: number,
    cantidad: string,
    fecha: string,
    panFaltante: string,
    panSobrante: string,
    observaciones: string
  ) => {
    try {
      await Axios.put(
        `http://localhost:3000/api/editProduccionDiaria/${idProduccion}`,
        {
          // IdTipoPan: idTipoPan,
          Cantidad: cantidad,
          Fecha: fecha,
          PanFaltante: panFaltante,
          PanSobrante: panSobrante,
          Observaciones: observaciones,
        }
      );
      getLisProDiariaPanes();
    } catch (err: any) {
      console.error("Axios error lol:", err.response?.data);
      throw err;
    }
  };
  const handleNext = () => {
    if (offset + limit < total) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  // Función para manejar el botón "Anterior"
  const handlePrevious = () => {
    if (offset > 0) {
      setOffset((prevOffset) => Math.max(0, prevOffset - limit));
    }
  };
  // Obtener la lista al montar el proveedor
  useEffect(() => {
    getLisProDiariaPanes();
  }, [offset]);
  return (
    <ProPanContext.Provider
      value={{
        proDiariaPanesList,
        getLisProDiariaPanes,
        addProduccionDiaria,
        deleteProduccionDiaria,
        editProduccionDiaria,
        handleNext,
        handlePrevious,
        offset,
        limit,
        total,
      }}
    >
      {children}
    </ProPanContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useProDiariaPanContext = () => {
  const context = useContext(ProPanContext);
  if (!context) {
    throw new Error(
      "useProDiariaPanContext debe ser usado dentro de un ProPanProvider"
    );
  }
  return context;
};
