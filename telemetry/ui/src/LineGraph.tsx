import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TemperatureProps {
  temp: number;

}
export const options = {
  maintainAspectRatio: false,
  responsive: true,
  animation: {
    duration: 0,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Previous Battery Temperature",
      color: "white",
      font: {
        size: 25,
      },
    },
  },
  scales: {
    y: {
      max: 1000,
      min: 0,
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: "Temperature (°C)",
        color: "white",
        font: {
          size: 25,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};
const labels = new Array(40).fill("");

const data = new Array(labels.length).fill(0);

function LineChart({ temp }: TemperatureProps) {
  data.shift();
  data.push(temp);
  const table = {
    labels,
    datasets: [
      {
        label: "previous info",
        data: data,
        borderColor: "rgb(241, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    ],
  };

  return <Line options={options} data={table} />;
}

export default LineChart;
