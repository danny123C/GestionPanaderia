import { createContext, useContext, useState, ReactNode } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

export type TipoDetallesPedido = {
  IdPedido: number;
  IdDetalle: number;
  NombreTipoPan: string;
  idTipoPan: number;
  Cantidad: number;
  PrecioUnitario: number;
  Subtotal: number;
};

export type DetallePedidosContextType = {
  detallePedidoList: TipoDetallesPedido[];
  getDetallePedido: (idPedido: number) => void;
  addDetallePedido: (
    IdPedido: number,
    IdTipoDePan: number,
    Cantidad: number,
    PrecioUnitario: number
  ) => Promise<void>;
  deleteDetallePedido: (id: number) => Promise<void>;
  editDetallePedido: (
    id: number,
    idTipoPan: number,
    cantidad: number,
    precioUnitario: number
  ) => Promise<void>;
};

const DetallePedidosContext = createContext<
  DetallePedidosContextType | undefined
>(undefined);

export const DetallePedidosProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [detallePedidoList, setDetallePedidoList] = useState<
    TipoDetallesPedido[]
  >([]);

  const getDetallePedido = async (idPedido: number) => {
    try {
      const response = await Axios.get<TipoDetallesPedido[]>(
        `http://localhost:3000/api/detallePedido/${idPedido}`
      );
      setDetallePedidoList(response.data);
    } catch (error) {
      console.error("Error al obtener detalles del pedido", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron obtener los detalles del pedido.",
      });
    }
  };

  const addDetallePedido = async (
    idPedido: number,
    idTipoDePan: number,
    cantidad: number,
    precioUnitario: number
  ) => {
    try {
      const response = await Axios.post(
        "http://localhost:3000/api/addDetallePedido",
        {
          IdPedido: idPedido,
          IdTipoPan: idTipoDePan,
          Cantidad: cantidad,
          PrecioUnitario: precioUnitario,
        }
      );

      setDetallePedidoList((prevList) => [...prevList, response.data]);

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Detalle del pedido añadido con éxito.",
      });
    } catch (error) {
      console.error("Error al añadir detalle del pedido", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo añadir el detalle del pedido.",
      });
    }
  };

  const deleteDetallePedido = async (id: number) => {
    try {
      const response = await Axios.delete(
        `http://localhost:3000/api/deleteDetallePedido/${id}`
      );

      // Lógica para actualizar la lista
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        html: `No se pudo eliminar el Pedido!`,
      });

      console.error("Error al eliminar DetallePedido:", error.message);
      throw error; // Propagar el error para manejarlo en el componente
    }
  };

  const editDetallePedido = async (
    id: number,
    idTipoPan: number,
    cantidad: number,
    precioUnitario: number
  ) => {
    try {
      const response = await Axios.put(
        `http://localhost:3000/api/editDetallePedido/${id}`,
        {
          idTipoPan: idTipoPan,
          Cantidad: cantidad,
          PrecioUnitario: precioUnitario,
        }
      );
      console.log("DETALLEPEDido editado con exito", response);
      // Lógica para actualizar la lista
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        html: `No se pudo eliminar el Pedido!`,
      });

      console.error("Error al eliminar DetallePedido:", error.message);
      throw error; // Propagar el error para manejarlo en el componente
    }
  };
  return (
    <DetallePedidosContext.Provider
      value={{
        detallePedidoList,
        getDetallePedido,
        addDetallePedido,
        deleteDetallePedido,
        editDetallePedido,
      }}
    >
      {children}
    </DetallePedidosContext.Provider>
  );
};

// Custom hook to use the context
export const useDetallePedidosContext = () => {
  const context = useContext(DetallePedidosContext);
  if (!context) {
    throw new Error(
      "useDetallePedidosContext debe ser usado dentro de un DetallePedidosProvider"
    );
  }
  return context;
};
