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
      text: "Chest Pull Progress",
    },
  },
};

const repsData = [38, 60, 66, 70, 60];

const data = {
  labels: repsData.map((_, index) => `${index + 1}`),
  datasets: [
    {
      label: "Reps",
      data: repsData,
      backgroundColor: "rgb(73, 122, 76)",
    },
  ],
};

export const ChestPull = () => {
  return <Bar options={options} data={data} height={200} />;
};
