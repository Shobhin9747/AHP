<template>
  <MainLayout>
    <div
      class="min-h-screen w-full bg-gradient-to-br from-blue-500 via-indigo-200 to-purple-400 p-6 pt-20"
    >
      <div class="container mx-auto px-2 py-3">
        <!-- Header -->
        <div class="text-center mb-12 text-white">
          <h1 class="text-4xl font-bold mb-2">UK Compliance Summary</h1>
          <p class="text-lg opacity-90">Employee compliance overview</p>
        </div>

        <!-- Cards Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          <div
            v-for="(metric, index) in complianceMetrics"
            :key="index"
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Icon -->
            <div class="text-center mb-4">
              <i
                :class="[getIcon(metric), 'text-3xl', getValueColor(metric)]"
              ></i>
            </div>

            <!-- Content -->
            <div class="text-center">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">
                {{ metric["Compliance Metric"] }}
              </h3>
              <div
                class="text-3xl font-bold mb-2"
                :class="getValueColor(metric)"
              >
                {{ formatValue(metric.Value) }}
              </div>
              <p class="text-gray-600 text-sm mb-4">{{ metric.Details }}</p>
            </div>

            <!-- Status -->
            <div
              class="flex items-center justify-center gap-2 text-xs font-semibold uppercase"
              :class="getStatusColor(metric)"
            >
              <span
                class="w-2 h-2 rounded-full"
                :class="getStatusDotColor(metric)"
              ></span>
              {{ getStatusText(metric) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import complianceData from "../components/UkComplianceSummary.json";
import MainLayout from "../layout/MainLayout.vue";

const complianceMetrics = ref(complianceData["UK Compliance Summary"]);

// Simple icon mapping
const getIcon = (metric: any) => {
  const name = metric["Compliance Metric"];
  if (name.includes("Total")) return "fas fa-users";
  if (name.includes("Issues")) return "fas fa-exclamation-triangle";
  if (name.includes("Warnings")) return "fas fa-exclamation-circle";
  if (name.includes("Protection")) return "fas fa-shield-alt";
  if (name.includes("Reference")) return "fas fa-calendar-alt";
  if (name.includes("Average")) return "fas fa-chart-line";
  return "fas fa-info-circle";
};

const getValueColor = (metric: any) => {
  const name = metric["Compliance Metric"];
  if (name.includes("Issues") || name.includes("Warnings"))
    return "text-orange-500";
  if (name.includes("Average") && metric.Value < 0) return "text-red-500";
  return "text-green-500";
};

const getStatusColor = (metric: any) => {
  const name = metric["Compliance Metric"];
  if (name.includes("Issues") || name.includes("Warnings"))
    return "text-orange-500";
  if (name.includes("Average") && metric.Value < 0) return "text-red-500";
  return "text-green-500";
};

const getStatusDotColor = (metric: any) => {
  const name = metric["Compliance Metric"];
  if (name.includes("Issues") || name.includes("Warnings"))
    return "bg-orange-500";
  if (name.includes("Average") && metric.Value < 0) return "bg-red-500";
  return "bg-green-500";
};

const getStatusText = (metric: any) => {
  const name = metric["Compliance Metric"];
  if (name.includes("Issues")) return "Issues Found";
  if (name.includes("Warnings")) return "Warnings";
  if (name.includes("Total")) return "Total";
  if (name.includes("Protection")) return "Protected";
  if (name.includes("Reference")) return "Short Period";
  if (name.includes("Average")) return "Below Target";
  return "Normal";
};

const formatValue = (value: any) => {
  if (typeof value === "number") {
    if (value < 0) {
      return `£${Math.abs(value).toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return value.toLocaleString("en-GB");
  }
  return value;
};
</script>
