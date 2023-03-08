import React from "react";
import "./HourlyChart.css";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import countFrequency from "./frequency";
import { IoIosArrowBack } from "react-icons/io";
ChartJS.register(...registerables);
const HourlyChart = ({
  indexOfElementClicked,
  arrayOfAggregatedData,
  back,
}) => {
  const hourLabels = [
    "12am to 3am",
    "3am to 6am",
    "6am to 9am",
    "9am to 12pm",
    "12pm to 3pm",
    "3pm to 6pm",
    "6pm to 9pm",
    "9pm to 12am" 
  ];
  const hourlyScheduledData = [];
  const hoursAtParticularInstance = arrayOfAggregatedData[
    indexOfElementClicked
  ].map((x) => Math.floor(new Date(x.schedule_time).getHours()));
  const freqMap = countFrequency(
    hoursAtParticularInstance,
    hoursAtParticularInstance.length,
    24
  );
  var count=0;
  var sch=0;
  for (let [key, value] of freqMap.entries()) {
    sch=sch+value;
    count=count+1;
    if(count>=3){
      hourlyScheduledData.push(sch);
      count=0;
      sch=0;
    }
  }
  const hourlyData = {
    labels: hourLabels,
    datasets: [
      {
        label: "Hourly Scheduled",
        data: hourlyScheduledData,
        borderColor: "rgba(156, 72, 166, 1)",
        backgroundColor: "rgba(156, 72, 166, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Hours vs Scheduled",
      },
    },
    ticks: {
      stepSize: 1,
    },
  };
  return (
    <div>
      <button className="backBtn" onClick={back}>
        <IoIosArrowBack size={24} />
      </button>
      <Bar data={hourlyData} options={options} />
    </div>
  );
};
export default HourlyChart;
