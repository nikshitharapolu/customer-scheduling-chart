import "./App.css";
import data from "./data.json";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, getElementsAtEvent } from "react-chartjs-2";
import aggregateData from "./aggregateData";
import { useRef, useState } from "react";
import HourlyChart from "./HourlyChart";
ChartJS.register(...registerables);
function App() {
  const [currentGraph, setCurrentGraph] = useState("date_wise");
  const [elementClickedIndex, setElementClickedIndex] = useState();
  const aggregatedData = aggregateData(data);
  const arrayOfAggregatedData = Object.values(aggregatedData);
  const labels = Object.keys(aggregatedData);
  const rData = {
    labels,
    datasets: [
      {
        label: "Scheduled",
        data: arrayOfAggregatedData.map((x) => x.length),
        borderColor: "rgba(156, 72, 166, 1)",
        backgroundColor: "rgba(156, 72, 166, 0.5)",
      },
    ],
  };
  const hourlyBarRef = useRef();
  const onClick = (event) => {
    setElementClickedIndex(
      getElementsAtEvent(hourlyBarRef.current, event)[0].index
    );
    setCurrentGraph("hour_wise");
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Dates vs Scheduled",
      },
    },
  };
  return (
    <div className="App">
      <div className="main_chart">
        {currentGraph === "date_wise" ? (
          <Bar
            data={rData}
            ref={hourlyBarRef}
            onClick={onClick}
            options={options}
          />
        ) : (
          <HourlyChart
            indexOfElementClicked={elementClickedIndex}
            arrayOfAggregatedData={arrayOfAggregatedData}
            back={() => setCurrentGraph("date_wise")}
          />
        )}
      </div>
    </div>
  );
}
export default App;
