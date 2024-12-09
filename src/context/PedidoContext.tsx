import Swal from "sweetalert2";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Axios from "axios";
export type TipoPedidos = {
  IdPedido: number;
  IdCliente: number;
  FechaPedido: string;
  TotalPedido: number;
  NombreCliente: string;
};

export type TipoTotalPedidos = {
  IdPedido: number;
  TotalPedido: number;
};

export type PedidosContextType = {
  pedidosList: TipoPedidos[];
  listSumaTotalPedidos: TipoTotalPedidos[];
  getListPedidos: () => void;
  getSumaTotalPedidos: () => void;
  addPedidos: (IdCliente: number, FechaPedido: string) => Promise<void>;
  deletePedidos: (id: number) => Promise<void>;
  editPedido: (
    id: number,
    IdCliente: number,
    FechaPedido: string,

    NombreCliente?: string
  ) => Promise<void>;
  handleNext: () => void;
  handlePrevious: () => void;
  offset: number;
  limit: number;
  total: number;
};

const PedidosContext = createContext<PedidosContextType | undefined>(undefined);

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
  const [pedidosList, setPedidosList] = useState<TipoPedidos[]>([]);
  const [listSumaTotalPedidos, setListSumaTotalPedidos] = useState<
    TipoPedidos[]
  >([]);
  const [limit] = useState(10); // Número de registros por página
  const [offset, setOffset] = useState(0); // Registro inicial
  const [total, setTotal] = useState(0); // Total de registros (opcional)

  const getListPedidos = () => {
    Axios.get<{
      data: TipoPedidos[];
      pagination: { limit: number; offset: number; total: number };
    }>(`http://localhost:3000/api/listPedidos?limit=${limit}&offset=${offset}`)
      .then((response) => {
        setPedidosList(response.data.data);
        setTotal(response.data.pagination.total); // Total de registros
      })
      .catch((error) => {
        console.error("Error al obtener la lista de pedidos:", error.message);
      });
  };

  const addPedidos = async (idCliente: number, fechaPedido: string) => {
    try {
      await Axios.post("http://localhost:3000/api/addPedido", {
        IdCliente: idCliente,
        FechaPedido: fechaPedido,
      });
      getListPedidos();
    } catch (error: any) {
      console.error("Error al añadir pedido:", error.message);
      throw error;
    }
  };

  const deletePedidos = async (id: number) => {
    try {
      await Axios.delete(`http://localhost:3000/api/deletePedido/${id}`);
      Swal.fire({
        title: "Pedido eliminado",
        text: `El pedido con ID ${id} fue eliminado con éxito.`,
        icon: "success",
        timer: 2000,
      });
      getListPedidos();
    } catch (error: any) {
      console.error("Error al eliminar pedido:", error.message);
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el pedido. Verifique que el Pedido a eliminar no contenga Subpedidos",

        icon: "error",
      });
      throw error;
    }
  };
  const editPedido = async (
    id: number,
    idCliente: number,
    fechaPedido: string
  ) => {
    try {
      await Axios.put(`http://localhost:3000/api/editPedido/${id}`, {
        IdCliente: idCliente,
        FechaPedido: fechaPedido,
      });
      getListPedidos();
    } catch (err: any) {
      console.error("Axios error lol:", err.response?.data);
      throw err;
    }
  };
  const getSumaTotalPedidos = () => {
    Axios.get<TipoPedidos[]>("http://localhost:3000/api/listSumaTotalPedidos")
      .then((response) => {
        setListSumaTotalPedidos(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de pedidos:", error.message);
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
  useEffect(() => {
    getListPedidos();
  }, [offset]);

  return (
    <PedidosContext.Provider
      value={{
        pedidosList,
        listSumaTotalPedidos,
        getSumaTotalPedidos,
        getListPedidos,
        addPedidos,
        deletePedidos,
        editPedido,
        handleNext,
        handlePrevious,
        offset,
        limit,
        total,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};

export const usePedidosContext = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error(
      "usePedidosContext debe ser usado dentro de un PedidosProvider"
    );
  }
  return context;
};
