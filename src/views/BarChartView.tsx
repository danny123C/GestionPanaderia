import BarChart from "../components/BarChart";
import { BardChartViewProvider } from "../context/BardChardContext";
function BarChartView() {
  return (
    <BardChartViewProvider>
      <BarChart />
    </BardChartViewProvider>
  );
}

export default BarChartView;
