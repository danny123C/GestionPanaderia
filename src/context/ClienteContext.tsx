import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import Axios from "axios";
export type ClientePan = {
  IdCliente: number;
  Nombre: string;
  Telefono: number;
  Email: string;
};
type ClienteContextType = {
  clientesList: ClientePan[];
  getlistClientes: () => void;
  addClientes: (
    Nombre: string,
    Telefono: number,
    Email: string
  ) => Promise<void>;
  deleteClientes: (id: number) => Promise<void>;
  editCliente: (
    id: number,
    Nombre: string,
    Telefono: number,
    Email: string
  ) => Promise<void>;
};

export const ClienteContext = createContext<ClienteContextType | undefined>(
  undefined
);

export const ClienteProvider = ({ children }: { children: ReactNode }) => {
  const [clientesList, setClientesList] = useState<ClientePan[]>([]);

  const getlistClientes = () => {
    Axios.get<ClientePan[]>("http://localhost:3000/api/listClientes")
      .then((response) => {
        setClientesList(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error al listar Cleintes:", error.message);
      });
  };

  const addClientes = async (
    nombre: string,
    telefono: number,
    email: string
  ) => {
    try {
      await Axios.post("http://localhost:3000/api/addClientes", {
        Nombre: nombre,
        Telefono: telefono,
        Email: email,
      });
      getlistClientes();
    } catch (error: any) {
      console.error("Error al añadir Cliente:", error.message);
      throw error; // Propagar el error para manejarlo en el componente
    }
  };
  const deleteClientes = async (id: number) => {
    try {
      await Axios.delete(`http://localhost:3000/api/deleteCliente/${id}`);
      getlistClientes();
    } catch (err: any) {
      console.error("Error al Eliminar Cliente:", err.message);
      throw err;
    }
  };
  const editCliente = async (
    id: number,
    nombre: string,
    telefono: number,
    email: string
  ) => {
    try {
      await Axios.put(`http://localhost:3000/api/editCliente/${id}`, {
        Nombre: nombre,
        Telefono: telefono,
        Email: email,
      });
      getlistClientes(); // Actualizar la lista después de editar
    } catch (error: any) {
      console.error("Error al editar CLIENTE:", error.message);
      throw error; // Propagar el error para manejarlo en el componente
    }
  };
  // Obtener la lista al montar el proveedor
  useEffect(() => {
    getlistClientes();
  }, []);
  return (
    <ClienteContext.Provider
      value={{
        clientesList,
        getlistClientes,
        addClientes,
        deleteClientes,
        editCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};

export const useClienteContext = () => {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error(
      "useProDiariaPanContext debe ser usado dentro de un ProPanProvider"
    );
  }
  return context;
};
