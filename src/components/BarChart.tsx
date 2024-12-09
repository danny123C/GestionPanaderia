import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Bar } from "react-chartjs-2";
import { useBardChartViewContext } from "../context/BardChardContext";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Registrar componentes necesarios
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const BarChartView = () => {
  const { bardChartList, produccionDiariaGraficoList } =
    useBardChartViewContext();

  // Gráfico de pedidos
  const labelsPedidos = bardChartList.map(
    (data) => `${monthNames[data.Mes - 1] || "Mes Desconocido"} ${data["Año"]}`
  );
  const totalPedidosData = bardChartList.map((data) => data.TotalPedidos);
  const montoTotalData = bardChartList.map((data) => data.MontoTotal);

  const pedidosChartData = {
    labels: labelsPedidos,
    datasets: [
      {
        label: "Total de Pedidos",
        data: totalPedidosData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "$Total",
        data: montoTotalData,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Gráfico de producción diaria
  const labelsProduccion = produccionDiariaGraficoList.map(
    (data) => `${monthNames[data.Mes - 1] || "Mes Desconocido"} ${data["Año"]}`
  );
  const totalProduccionData = produccionDiariaGraficoList.map(
    (data) => data.CantidadTotalMes
  );
  const panFaltanteData = produccionDiariaGraficoList.map(
    (data) => data.PanFaltante
  );
  const panSobranteData = produccionDiariaGraficoList.map(
    (data) => data.PanSobrante
  );

  const produccionChartData = {
    labels: labelsProduccion,
    datasets: [
      {
        label: "Producción Total",
        data: totalProduccionData,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
      {
        label: "Pan Faltante",
        data: panFaltanteData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Pan Sobrante",
        data: panSobranteData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="table-container">
      <div className="table-responsive">
        {/* Gráfico de Pedidos */}
        <Card>
          <Card.Header>Ventas y Pedidos</Card.Header>
          <Card.Body>
            <div style={{ width: "100%", height: "250px", margin: "0 auto" }}>
              <Bar data={pedidosChartData} options={chartOptions} />
            </div>
          </Card.Body>
        </Card>

        {/* Gráfico de Producción */}
        <Card className="mt-4">
          <Card.Header>Producción Diaria</Card.Header>
          <Card.Body>
            <div style={{ width: "100%", height: "250px", margin: "0 auto" }}>
              <Bar data={produccionChartData} options={chartOptions} />
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default BarChartView;
