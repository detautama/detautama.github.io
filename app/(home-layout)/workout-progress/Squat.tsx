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
import { repsData } from "./data/squat";

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

const labels = repsData.map((data) => data.date);

const data = {
  labels,
  datasets: [
    {
      label: "Reps",
      data: repsData.map((data) => data.reps),
      backgroundColor: "rgb(59, 87, 72)",
    },
  ],
};

export const Squat = () => {
  return <Bar options={options} data={data} height={200} />;
};
