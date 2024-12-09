import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Axios from "axios";

export type ClientePanView = {
  NombreCliente: string;
  IdPedido: string;
  FechaPedido: string;
  TotalPedido: number;
  Abono: number;
  Observaciones: string;
  Pagado: boolean;
  NombresPan: string;
  TotalCantidad: number;
};

export type ProduccionView = {
  IdProduccion: number;
  Fecha: string;
  NombrePan: string;
  Cantidad: number;
  PanSobrante: number;
  PanFaltante: number;
};

type ClienteViewContextType = {
  clientesViewList: ClientePanView[];
  produccionViewList: ProduccionView[];
  getlistClientesView: () => void;
  getlistProduccionView: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  offset: number;
  limit: number;
  total: number;
};

export const ClienteViewContext = createContext<
  ClienteViewContextType | undefined
>(undefined);

export const ClienteViewProvider = ({ children }: { children: ReactNode }) => {
  const [clientesViewList, setClientesList] = useState<ClientePanView[]>([]);
  const [produccionViewList, setProduccionList] = useState<ProduccionView[]>(
    []
  );
  const [limit] = useState(14); // Número de registros por página
  const [offset, setOffset] = useState(0); // Registro inicial
  const [total, setTotal] = useState(0); // Total de registros (opcional)

  // Función para obtener la lista de Clientes
  const getlistClientesView = () => {
    Axios.get<{
      data: ClientePanView[];
      pagination: { limit: number; offset: number; total: number };
    }>(
      `http://localhost:3000/api/listaClientesVista?limit=${limit}&offset=${offset}` // Corregido el uso de las comillas invertidas
    )
      .then((response) => {
        setClientesList(response.data.data); // Actualiza la lista con los datos
        setTotal(response.data.pagination.total); // Total de registros
      })
      .catch((error) => {
        console.error("Error al listar Clientes:", error.message);
      });
  };

  // Función para obtener la lista de Producción
  const getlistProduccionView = () => {
    Axios.get<{
      data: ProduccionView[];
      pagination: { limit: number; offset: number; total: number };
    }>(
      `http://localhost:3000/api/listaProduccion?limit=${limit}&offset=${offset}` // Corregido el uso de las comillas invertidas
    )
      .then((response) => {
        setProduccionList(response.data.data); // Actualiza la lista con los datos de producción
        setTotal(response.data.pagination.total); // Total de registros
      })
      .catch((error) => {
        console.error("Error al listar Producción:", error.message);
      });
  };

  // Función para manejar el botón "Siguiente"
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

  // Obtener las listas al montar el proveedor
  useEffect(() => {
    getlistClientesView();
    getlistProduccionView();
  }, [offset]);

  return (
    <ClienteViewContext.Provider
      value={{
        clientesViewList,
        produccionViewList,
        getlistClientesView,
        getlistProduccionView,
        handleNext,
        handlePrevious,
        offset,
        limit,
        total,
      }}
    >
      {children}
    </ClienteViewContext.Provider>
  );
};

// Función para consumir el contexto
export const useClienteViewContext = () => {
  const context = useContext(ClienteViewContext);
  if (!context) {
    throw new Error(
      "useClienteViewContext debe ser usado dentro de un ClienteViewProvider"
    );
  }
  return context;
};
