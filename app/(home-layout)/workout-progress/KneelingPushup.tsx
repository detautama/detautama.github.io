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
import { repsData } from "./data/kneeling-pushup";

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
      text: "Kneeling Pushup Progress",
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
      backgroundColor: "rgb(53, 71, 71)",
    },
  ],
};

export const KneelingPushup = () => {
  return <Bar options={options} data={data} />;
};
