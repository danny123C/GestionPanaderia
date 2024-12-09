import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import Axios from "axios";

export type BardChartView = {
  Año: number;
  Mes: number;
  TotalPedidos: number;
  MontoTotal: number;
};
export type ProduccionDiariaView = {
  Año: number;
  Mes: number;
  NombrePan: Record<string, number>; // Claves dinámicas para los tipos de pan
  CantidadTotalMes: number;
  PanFaltante: number;
  PanSobrante: number;
};

type BardChartViewContextType = {
  bardChartList: BardChartView[];
  getlistBardChartView: () => void;
  produccionDiariaGraficoList: ProduccionDiariaView[];
  getProduccionDiariaGraficoList: () => void;
};

export const BardChartContext = createContext<
  BardChartViewContextType | undefined
>(undefined);

export const BardChartViewProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [bardChartList, setBardChartList] = useState<BardChartView[]>([]);
  const [produccionDiariaGraficoList, setProduccionDiariaGraficoList] =
    useState<ProduccionDiariaView[]>([]);
  const getlistBardChartView = () => {
    Axios.get<BardChartView[]>("http://localhost:3000/api/listaPedidosPorMes")
      .then((response) => {
        setBardChartList(response.data);
        console.log("Clientes data:", response);
      })
      .catch((error) => {
        console.error("Error al listar Clientes:", error.message);
      });
  };
  const getProduccionDiariaGraficoList = () => {
    Axios.get<ProduccionDiariaView[]>(
      "http://localhost:3000/api/listaProduccionPorMes"
    )
      .then((response) => {
        setProduccionDiariaGraficoList(response.data);
        console.log("porduciion data:", response);
      })
      .catch((error) => {
        console.error("Error al listar Produccion:", error.message);
      });
  };
  // Obtener las listas al montar el proveedor
  useEffect(() => {
    getlistBardChartView();
    getProduccionDiariaGraficoList();
  }, []);

  return (
    <BardChartContext.Provider
      value={{
        bardChartList,
        getlistBardChartView,
        produccionDiariaGraficoList,
        getProduccionDiariaGraficoList,
      }}
    >
      {children}
    </BardChartContext.Provider>
  );
};

// Función para consumir el contexto
export const useBardChartViewContext = () => {
  const context = useContext(BardChartContext);
  if (!context) {
    throw new Error(
      "useBardChartViewContext debe ser usado dentro de un ClienteViewProvider"
    );
  }
  return context;
};
