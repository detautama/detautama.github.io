"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Dumbbell Curl 5Kg Progress",
    },
  },
};

const repsData = [60, 70, 80, 85, 50, 90];

const data = {
  labels: repsData.map((_, index) => `${index + 1}`),
  datasets: [
    {
      label: "Reps",
      data: repsData,
      backgroundColor: "rgb(45, 51, 69)",
    },
  ],
};

export const DumbbellCurl5Kg = () => {
  return <Bar options={options} data={data} height={200} />;
};
