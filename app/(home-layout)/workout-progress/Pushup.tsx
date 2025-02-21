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
      text: "Pushup Progress",
    },
  },
};

const repsData = [30, 40];

const data = {
  labels: repsData.map((_, index) => `${index + 1}`),
  datasets: [
    {
      label: "Reps",
      data: repsData,
      backgroundColor: "rgb(39, 33, 67)",
    },
  ],
};

export const Pushup = () => {
  return <Bar options={options} data={data} height={200} />;
};
