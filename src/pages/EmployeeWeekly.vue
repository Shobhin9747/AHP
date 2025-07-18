<template>
  <MainLayout>
    <div
      class="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 pt-20"
    >
      <div class="container mx-auto px-2 py-3">
        <!-- Header -->
        <div class="mb-8 text-center">
          <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Weekly Employee Eligibility
          </h1>
          <p class="text-gray-600 text-lg">
            Track employee performance and eligibility on a weekly basis
          </p>
        </div>

        <!-- Employee Selector -->
        <div class="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div class="flex items-center gap-4">
            <label class="text-lg font-semibold text-gray-700 whitespace-nowrap">
              Select Employee
            </label>
            <select
              v-model="selectedEmployee"
              @change="updateEmployeeData"
              class="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-lg bg-white/90 backdrop-blur-sm"
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
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center">
              <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <svg
                  class="w-8 h-8 text-white"
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
                <p class="text-white/80 text-sm font-medium">Total Records</p>
                <p class="text-3xl font-bold text-white">
                  {{ employeeStats.totalRecords }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center">
              <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <svg
                  class="w-8 h-8 text-white"
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
                <p class="text-white/80 text-sm font-medium">Eligible Weeks</p>
                <p class="text-3xl font-bold text-white">
                  {{ employeeStats.eligibleWeeks }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center">
              <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <svg
                  class="w-8 h-8 text-white"
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
                <p class="text-white/80 text-sm font-medium">
                  Ineligible Weeks
                </p>
                <p class="text-3xl font-bold text-white">
                  {{ employeeStats.ineligibleWeeks }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center">
              <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <svg
                  class="w-8 h-8 text-white"
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
                <p class="text-white/80 text-sm font-medium">
                  Eligibility Rate
                </p>
                <p class="text-3xl font-bold text-white">
                  {{ employeeStats.eligibilityRate.toFixed(1) }}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Employee Weekly Details -->
        <div v-if="employeeWeeksData.length" class="space-y-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Employee Weekly Details
            </h2>
          </div>

          <div
            v-for="(week, index) in employeeWeeksData"
            :key="week.weekStart"
            class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Employee Header -->
            <div class="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    {{ week.employeeName }}
                  </h3>
                  <p class="text-gray-600 text-lg">
                    Employee ID: {{ week.employeeId }}
                  </p>
                  <p class="text-sm text-gray-500 mt-2 bg-white px-3 py-1 rounded-full inline-block">
                    Week: {{ formatDateRange(week.weekStart, week.weekEnd) }}
                  </p>
                </div>
                <div class="text-right">
                  <div class="flex items-center space-x-3">
                    <span class="text-sm text-gray-500">Week Status:</span>
                    <span
                      class="px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                      :class="
                        week.isEligibleWeek
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                          : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                      "
                    >
                      {{ week.isEligibleWeek ? "Eligible" : "Not Eligible" }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-400 mt-2 bg-white/80 px-2 py-1 rounded">
                    {{ week.eligibilityReason }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Daily Cards -->
            <div class="p-8">
              <h4 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Daily Breakdown
              </h4>
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
              >
                <div
                  v-for="day in week.dailyData"
                  :key="day.date"
                  class="border-2 rounded-xl p-4 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  :class="
                    day.isEligible
                      ? 'border-green-300 bg-gradient-to-br from-green-50 to-green-100'
                      : day.isWorkingDay
                      ? 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100'
                      : 'border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100'
                  "
                >
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-semibold text-gray-900">
                      {{ day.dayName }}
                    </span>
                    <span
                      class="px-2 py-1 rounded-full text-xs font-bold shadow-sm"
                      :class="
                        day.isEligible
                          ? 'bg-green-500 text-white'
                          : day.isWorkingDay
                          ? 'bg-red-500 text-white'
                          : 'bg-blue-500 text-white'
                      "
                    >
                      {{ day.isEligible ? "E" : day.isWorkingDay ? "NE" : "W" }}
                    </span>
                  </div>

                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <span class="text-xs text-gray-600 font-medium">Hours:</span>
                      <span class="font-bold text-gray-900">{{ day.hours }}h</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xs text-gray-600 font-medium">Status:</span>
                      <span
                        class="font-bold text-sm"
                        :class="
                          day.attendanceStatus === 'Present' ? 'text-green-600' : 
                          day.attendanceStatus === 'Weekend' ? 'text-blue-400' : 'text-red-500'
                        "
                      >
                        {{ day.attendanceStatus }}
                      </span>
                    </div>
                    <div
                      v-if="day.notes"
                      class="text-xs text-gray-600 mt-3 p-2 bg-white/80 rounded-lg border"
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
          v-else-if="selectedEmployee"
          class="text-center py-16"
        >
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl">
            <svg
              class="mx-auto h-16 w-16 text-gray-400 mb-4"
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
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              No data found
            </h3>
            <p class="text-gray-500">
              No weekly data available for the selected employee.
            </p>
          </div>
        </div>

        <!-- Select Employee Message -->
        <div v-else class="text-center py-16">
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl">
            <svg
              class="mx-auto h-16 w-16 text-gray-400 mb-4"
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
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Select an employee
            </h3>
            <p class="text-gray-500">
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
const employeeWeeksData = ref<any[]>([]);
const employeeStats = ref({
  totalRecords: 0,
  eligibleWeeks: 0,
  ineligibleWeeks: 0,
  eligibilityRate: 0,
});

// Get data from service
const employees = getUniqueEmployees();

// Methods
const updateEmployeeData = () => {
  if (selectedEmployee.value) {
    // Get all weeks for the employee
    const weeks = getWeeksForEmployee(selectedEmployee.value as number);
    employeeWeeksData.value = weeks.map((week: any) =>
      getWeeklyBreakdown(selectedEmployee.value as number, week.WeekStart)
    );
    // Calculate stats for the selected employee
    const total = employeeWeeksData.value.length;
    const eligible = employeeWeeksData.value.filter((w: any) => w.isEligibleWeek).length;
    const ineligible = total - eligible;
    const rate = total > 0 ? (eligible / total) * 100 : 0;
    employeeStats.value = {
      totalRecords: total,
      eligibleWeeks: eligible,
      ineligibleWeeks: ineligible,
      eligibilityRate: rate,
    };
  } else {
    employeeWeeksData.value = [];
    employeeStats.value = {
      totalRecords: 0,
      eligibleWeeks: 0,
      ineligibleWeeks: 0,
      eligibilityRate: 0,
    };
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
