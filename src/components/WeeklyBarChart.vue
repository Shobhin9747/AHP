<template>
  <div class="bar-chart-wrapper">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { computed } from "vue";
import type { ChartOptions } from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps<{
  dailyData: Array<{
    dayName: string;
    hours: number;
    performance: number;
    isEligible: boolean;
    isWorkingDay?: boolean;
  }>;
}>();

const chartData = computed(() => ({
  labels: props.dailyData.map((day) => day.dayName),
  datasets: [
    {
      label: "Hours",
      backgroundColor: "#3b82f6", // blue for all hours bars
      data: props.dailyData.map((day) => day.hours),
    },
    {
      label: "Performance (%)",
      backgroundColor: "#f59e42", // orange for all performance bars
      data: props.dailyData.map((day) => day.performance),
    },
  ],
}));

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" as const },
    title: { display: true, text: "Weekly Details" },
  },
  layout: {
    padding: 10,
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
    },
  },
};
</script>

<style scoped>
.bar-chart-wrapper {
  max-width: 500px;
  margin: 0 auto;
  height: 250px;
}
.bar-chart-wrapper canvas {
  height: 100% !important;
  max-height: 250px !important;
}
</style>
