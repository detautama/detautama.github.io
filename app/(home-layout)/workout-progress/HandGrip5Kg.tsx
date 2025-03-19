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
      text: "Hand Grip 5Kg Progress",
    },
  },
};

const repsData = [30, 10, 10, 35, 10, 20, 30, 20, 15, 35, 40, 50, 60, 61];

const data = {
  labels: repsData.map((_, index) => `${index + 1}`),
  datasets: [
    {
      label: "Reps",
      data: repsData,
      backgroundColor: "rgb(41, 40, 68)",
    },
  ],
};

export const HandGrip5Kg = () => {
  return <Bar options={options} data={data} height={200} />;
};
