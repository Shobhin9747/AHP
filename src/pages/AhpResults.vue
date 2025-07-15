<template>
  <MainLayout>
    <div class="bg-gradient-to-br from-blue-100 to-purple-200 p-8 pt-20">
      <!-- Summary -->
      <div class="max-w-6xl mx-auto mb-8">
        <h1 class="text-3xl font-bold text-center mb-2 text-blue-900">
          AHP Results
        </h1>
        <div class="flex flex-wrap justify-center gap-4 mb-4">
          <div
            class="bg-white rounded-lg shadow px-4 py-2 text-sm font-semibold text-gray-700"
          >
            Total Employees: {{ results.length }}
          </div>
          <div
            class="bg-green-100 text-green-700 rounded-lg px-4 py-2 text-sm font-semibold"
            v-if="noIssueCount > 0"
          >
            No Issues: {{ noIssueCount }}
          </div>
          <div
            class="bg-red-100 text-red-700 rounded-lg px-4 py-2 text-sm font-semibold"
            v-if="issueCount > 0"
          >
            With Issues: {{ issueCount }}
          </div>
          <div
            class="bg-yellow-100 text-yellow-700 rounded-lg px-4 py-2 text-sm font-semibold"
            v-if="warningCount > 0"
          >
            With Warnings: {{ warningCount }}
          </div>
        </div>
      </div>

      <!-- Employee Cards -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-8xl mx-auto"
      >
        <div
          v-for="emp in results"
          :key="emp.EmployeeID"
          class="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-2 border-l-4"
          :class="getBorderColor(emp)"
        >
          <div class="flex items-center gap-2 mb-2">
            <span class="font-bold text-lg text-blue-900">{{
              emp.EmployeeName
            }}</span>
            <span
              class="ml-auto px-2 py-0.5 rounded text-xs font-semibold"
              :class="getEligibilityColor(emp.EligibilityType)"
              >{{ emp.EligibilityType }}</span
            >
          </div>
          <div class="text-gray-600 text-xs mb-1">
            Ref: {{ emp.ReferencePeriodStart }} to {{ emp.ReferencePeriodEnd }}
          </div>
          <div class="flex flex-wrap gap-2 mb-2">
            <div class="bg-blue-50 text-blue-700 rounded px-2 py-1 text-xs">
              AHP:
              <span class="font-bold">£{{ formatNum(emp.AHPAmount) }}</span>
            </div>

            <div class="bg-gray-50 text-gray-700 rounded px-2 py-1 text-xs">
              Basic Salary:
              <span class="font-bold"
                >£{{ formatNum(emp.BasicSalaryProtection) }}</span
              >
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mb-2">
            <div class="bg-gray-100 text-gray-700 rounded px-2 py-1 text-xs">
              Avg Hrs/Wk:
              <span class="font-bold">{{
                formatNum(emp.AverageHoursPerWeek)
              }}</span>
            </div>
            <div class="bg-gray-100 text-gray-700 rounded px-2 py-1 text-xs">
              Hourly:
              <span class="font-bold">£{{ formatNum(emp.HourlyRate) }}</span>
            </div>
          </div>
          <div class="text-xs text-gray-500 mb-1">
            AHP Formula: <span class="font-mono">{{ emp.AHPFormula }}</span>
          </div>
          <div class="flex gap-2 mt-2">
            <span
              v-if="emp.ComplianceIssues && emp.ComplianceIssues !== 'None'"
              class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1"
              ><i class="fas fa-exclamation-triangle"></i>
              {{ emp.ComplianceIssues }}</span
            >
            <span
              v-if="emp.ComplianceWarnings && emp.ComplianceWarnings !== 'None'"
              class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1"
              ><i class="fas fa-exclamation-circle"></i>
              {{ emp.ComplianceWarnings }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import ahpData from "../components/ahpResults.json";
import { computed } from "vue";
import MainLayout from "../layout/MainLayout.vue";

const results = ahpData["AHP Results"];

const issueCount = computed(
  () =>
    results.filter((e) => e.ComplianceIssues && e.ComplianceIssues !== "None")
      .length
);
const warningCount = computed(
  () =>
    results.filter(
      (e) => e.ComplianceWarnings && e.ComplianceWarnings !== "None"
    ).length
);
const noIssueCount = computed(
  () =>
    results.filter(
      (e) =>
        (!e.ComplianceIssues || e.ComplianceIssues === "None") &&
        (!e.ComplianceWarnings || e.ComplianceWarnings === "None")
    ).length
);

function formatNum(val: number) {
  if (typeof val !== "number") return val;
  return val.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getBorderColor(emp: any) {
  if (emp.ComplianceIssues && emp.ComplianceIssues !== "None")
    return "border-red-400";
  if (emp.ComplianceWarnings && emp.ComplianceWarnings !== "None")
    return "border-yellow-400";
  return "border-green-400";
}

function getEligibilityColor(type: string) {
  if (type === "Weekly") return "bg-blue-100 text-blue-700";
  if (type === "Monthly") return "bg-purple-100 text-purple-700";
  if (type === "Biweekly") return "bg-teal-100 text-teal-700";
  if (type === "Seasonal") return "bg-green-100 text-green-700";
  if (type === "Accrual") return "bg-pink-100 text-pink-700";
  if (type === "Daily" || type === "DailyVariable")
    return "bg-orange-100 text-orange-700";
  if (type === "Hourly" || type === "MonthlyVariable")
    return "bg-gray-100 text-gray-700";
  return "bg-gray-200 text-gray-700";
}
</script>
