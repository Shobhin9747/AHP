<template>
  <MainLayout>
    <div
      class="min-h-screen w-full bg-gradient-to-br from-sky-100 via-rose-100 to-amber-100 p-6 pt-20"
    >
      <div class="container mx-auto px-2 py-3">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Weekly Employee Eligibility
          </h1>
          <p class="text-gray-600">
            Track employee performance and eligibility on a weekly basis
          </p>
        </div>

        <!-- Employee and Week Selector -->
        <div class="mb-6 bg-white rounded-lg shadow p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Select Employee:</label
              >
              <select
                v-model="selectedEmployee"
                @change="updateEmployeeData"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an employee</option>
                <option
                  v-for="employee in employees"
                  :key="employee.id"
                  :value="employee.id"
                >
                  {{ employee.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Select Week:</label
              >
              <select
                v-model="selectedWeek"
                @change="updateWeekData"
                :disabled="!selectedEmployee"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">Choose a week</option>
                <option
                  v-for="week in availableWeeks"
                  :key="week.WeekStart"
                  :value="week.WeekStart"
                >
                  {{ formatDateRange(week.WeekStart, week.WeekEnd) }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Records</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ eligibilityStats.totalRecords }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg
                  class="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Eligible Weeks</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ eligibilityStats.eligibleWeeks }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-red-100 rounded-lg">
                <svg
                  class="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">
                  Ineligible Weeks
                </p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ eligibilityStats.ineligibleWeeks }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <svg
                  class="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">
                  Eligibility Rate
                </p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ eligibilityStats.eligibilityRate.toFixed(1) }}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Employee Weekly Details -->
        <div v-if="currentWeekData" class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Employee Weekly Details
          </h2>

          <div class="bg-white rounded-lg shadow">
            <!-- Employee Header -->
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-xl font-semibold text-gray-900">
                    {{ currentWeekData.employeeName }}
                  </h3>
                  <p class="text-gray-600">
                    Employee ID: {{ currentWeekData.employeeId }}
                  </p>
                  <p class="text-sm text-gray-500 mt-1">
                    Week:
                    {{
                      formatDateRange(
                        currentWeekData.weekStart,
                        currentWeekData.weekEnd
                      )
                    }}
                  </p>
                </div>
                <div class="text-right">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-500">Week Status:</span>
                    <span
                      class="px-3 py-1 rounded-full text-sm font-medium"
                      :class="
                        currentWeekData.isEligibleWeek
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      "
                    >
                      {{
                        currentWeekData.isEligibleWeek
                          ? "Eligible"
                          : "Not Eligible"
                      }}
                    </span>
                  </div>

                  <p class="text-xs text-gray-400 mt-1">
                    {{ currentWeekData.eligibilityReason }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Daily Cards -->
            <div class="p-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4">
                Daily Breakdown
              </h4>
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4"
              >
                <div
                  v-for="day in currentWeekData.dailyData"
                  :key="day.date"
                  class="border rounded-lg p-3 md:p-4"
                  :class="
                    day.isEligible
                      ? 'border-green-200 bg-green-50'
                      : day.isWorkingDay
                      ? 'border-gray-200 bg-gray-50'
                      : 'border-gray-100 bg-gray-25'
                  "
                >
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs md:text-sm font-medium text-gray-900">
                      {{ day.dayName }}
                    </span>
                    <span
                      class="px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium"
                      :class="
                        day.isEligible
                          ? 'bg-green-100 text-green-800'
                          : day.isWorkingDay
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-600'
                      "
                    >
                      {{ day.isEligible ? "E" : day.isWorkingDay ? "NE" : "W" }}
                    </span>
                  </div>

                  <div class="space-y-1 md:space-y-2">
                    <div class="flex justify-between text-xs md:text-sm">
                      <span class="text-gray-600">Hours:</span>
                      <span class="font-medium">{{ day.hours }}h</span>
                    </div>
                    <div class="flex justify-between text-xs md:text-sm">
                      <span class="text-gray-600">Perf:</span>
                      <span class="font-medium">{{ day.performance }}%</span>
                    </div>
                    <div class="flex justify-between text-xs md:text-sm">
                      <span class="text-gray-600">Status:</span>
                      <span
                        class="font-medium"
                        :class="
                          day.attendance ? 'text-green-600' : 'text-gray-400'
                        "
                      >
                        {{ day.attendance ? "Present" : "Weekend" }}
                      </span>
                    </div>
                    <div
                      v-if="day.notes"
                      class="text-xs text-gray-500 mt-1 md:mt-2 p-1.5 md:p-2 bg-white rounded"
                    >
                      {{ day.notes }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Data Message -->
        <div
          v-else-if="selectedEmployee && selectedWeek"
          class="text-center py-12"
        >
          <div class="text-gray-500">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">
              No data found
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              No weekly data available for the selected employee and week.
            </p>
          </div>
        </div>

        <!-- Select Employee Message -->
        <div v-else class="text-center py-12">
          <div class="text-gray-500">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">
              Select an employee
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Choose an employee from the dropdown to view their weekly
              eligibility data.
            </p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import MainLayout from "../layout/MainLayout.vue";
import {
  getUniqueEmployees,
  getWeeksForEmployee,
  getEligibilityStats,
  getWeeklyBreakdown,
} from "../components/weeklyEligibleService";

const selectedEmployee = ref<number | "">("");
const selectedWeek = ref<string>("");
const currentWeekData = ref<any>(null);

// Get data from service
const employees = getUniqueEmployees();
const availableWeeks = ref<any[]>([]);
const eligibilityStats = getEligibilityStats();

// Methods
const updateEmployeeData = () => {
  if (selectedEmployee.value) {
    availableWeeks.value = getWeeksForEmployee(
      selectedEmployee.value as number
    );
    selectedWeek.value = "";
    currentWeekData.value = null;
  } else {
    availableWeeks.value = [];
    selectedWeek.value = "";
    currentWeekData.value = null;
  }
};

const updateWeekData = () => {
  if (selectedEmployee.value && selectedWeek.value) {
    currentWeekData.value = getWeeklyBreakdown(
      selectedEmployee.value as number,
      selectedWeek.value
    );
  } else {
    currentWeekData.value = null;
  }
};

const formatDateRange = (weekStart: string, weekEnd: string) => {
  const start = new Date(weekStart);
  const end = new Date(weekEnd);
  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
};

onMounted(() => {
  // Component is ready
});
</script>
