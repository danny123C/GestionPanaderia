import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import Axios from "axios";
import Swal from "sweetalert2";

export type CuentasType = {
  IdPedido: number;
  NombreCliente: string;
  FechaPedido: string;
  Abono: number | null;
  Pagado: boolean;
  TotalPedido: number;
  Observaciones: string;
};

type CuentasContextType = {
  cuentasList: CuentasType[];
  getlistClientes: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  editCuentas: (
    IdPedido: number,
    Pagado: boolean,
    Abono: number,
    Observaciones: string
  ) => Promise<void>;
  offset: number;
  limit: number;
  total: number;
};

const CuentasContext = createContext<CuentasContextType | undefined>(undefined);

export const CuentasProvider = ({ children }: { children: ReactNode }) => {
  const [cuentasList, setCuentasList] = useState<CuentasType[]>([]);
  const [limit] = useState(10); // Número de registros por página
  const [offset, setOffset] = useState(0); // Registro inicial
  const [total, setTotal] = useState(0); // Total de registros (opcional)

  // Función para obtener la lista de cuentas con paginación
  const getlistClientes = () => {
    Axios.get<{
      data: CuentasType[];
      pagination: { limit: number; offset: number; total: number };
    }>(`http://localhost:3000/api/listCuentas?limit=${limit}&offset=${offset}`)
      .then((response) => {
        setCuentasList(response.data.data); // Actualiza la lista con los datos
        setTotal(response.data.pagination.total); // Total de registros
        console.log(response);
      })
      .catch((error) => {
        console.error("Error al listar Cuentas:", error.message);
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

  const editCuentas = async (
    IdPedido: number,
    Pagado: boolean,
    Abono: number,
    Observaciones: string
  ) => {
    try {
      await Axios.put(
        `http://localhost:3000/api/actualizarCuenta/${IdPedido}`,
        {
          Pagado,
          Abono,
          Observaciones,
        }
      );
      getlistClientes(); // Actualizar la lista después de la operación
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        html: `No se pudo añadir a <strong>${IdPedido}</strong>!.`,
      });
      console.error("Error al añadir cuenta:", error.message);
      throw error;
    }
  };

  // Llama a la función cada vez que `offset` cambie
  useEffect(() => {
    getlistClientes();
  }, [offset]);

  return (
    <CuentasContext.Provider
      value={{
        cuentasList,
        getlistClientes,
        handleNext,
        handlePrevious,
        editCuentas,
        offset,
        limit,
        total,
      }}
    >
      {children}
    </CuentasContext.Provider>
  );
};

export const useCuentasContext = () => {
  const context = useContext(CuentasContext);
  if (!context) {
    throw new Error(
      "useCuentasContext debe ser usado dentro de CuentasProvider"
    );
  }
  return context;
};
