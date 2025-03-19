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
      text: "Squat Progress",
    },
  },
};

const repsData = [50, 55, 56, 57, 58, 60, 70, 20, 70, 75, 50, 35,80, 30, 40];

const data = {
  labels: repsData.map((_, index) => `${index + 1}`),
  datasets: [
    {
      label: "Reps",
      data: repsData,
      backgroundColor: "rgb(59, 87, 72)",
    },
  ],
};

export const Squat = () => {
  return <Bar options={options} data={data} height={200} />;
};
