<template>
  <MainLayout>
    <div
      class="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 p-6 pt-20"
    >
      <div class="container mx-auto px-2 py-3">
        <!-- Header -->
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-bold text-blue-900 mb-2">
            Holiday & Leave Transactions
          </h1>
          <p class="text-gray-600">
            View and manage employee holiday and leave requests
          </p>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6 flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Requests</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ summary.total }}
              </p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-6 flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Bank Holiday</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ summary.bankHoliday }}
              </p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-6 flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <svg
                class="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Statutory Leave</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ summary.statutoryLeave }}
              </p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-6 flex items-center">
            <div class="p-3 bg-red-100 rounded-lg">
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
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Additional Leave</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ summary.additionalLeave }}
              </p>
            </div>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="flex flex-col md:flex-row items-center mb-6 gap-3">
          <input
            v-model="employeeNameInput"
            type="text"
            placeholder="Search by employee name..."
            class="w-full md:w-1/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
          />
          <button
            @click="searchByEmployeeName"
            class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        <!-- Transactions Table -->
        <div class="bg-white rounded-lg shadow overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Employee Name
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Leave Type
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Days
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Hours
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment Method
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Payment
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr
                v-for="tx in filteredTransactions"
                :key="tx.TransactionId"
                class="hover:bg-blue-50 transition"
              >
                <td class="px-4 py-3 whitespace-nowrap">
                  {{ formatDate(tx.LeaveDate) }}
                </td>
                <td
                  class="px-4 py-3 whitespace-nowrap font-medium text-blue-900"
                >
                  {{ getEmployeeNameById(tx.EmployeeId) }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span :class="leaveTypeBadgeClass(tx.LeaveType)">{{
                    formatLeaveType(tx.LeaveType)
                  }}</span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">{{ tx.LeaveDays }}</td>
                <td class="px-4 py-3 whitespace-nowrap">{{ tx.LeaveHours }}</td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span :class="paymentMethodBadgeClass(tx.PaymentMethod)">{{
                    formatPaymentMethod(tx.PaymentMethod)
                  }}</span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-gray-600">
                  {{ formatCurrency(tx.TotalPayment) }}
                </td>
              </tr>
              <tr v-if="filteredTransactions.length === 0">
                <td colspan="7" class="text-center py-6 text-gray-400">
                  No transactions found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  getAllHolidayLeaveTransactions,
  getHolidayLeaveStats,
  formatLeaveType,
  formatPaymentMethod,
  getEmployeeNameById,
  type HolidayLeaveTransaction,
} from "../components/holidayLeaveService";
import MainLayout from "../layout/MainLayout.vue";

const transactions = ref<HolidayLeaveTransaction[]>([]);
const stats = ref<any>({});

onMounted(() => {
  transactions.value = getAllHolidayLeaveTransactions();
  stats.value = getHolidayLeaveStats();
});

const employeeNameInput = ref("");

const filteredTransactions = computed(() => {
  let filtered = transactions.value;
  if (employeeNameInput.value.trim()) {
    filtered = filtered.filter((tx) =>
      getEmployeeNameById(tx.EmployeeId)
        .toLowerCase()
        .includes(employeeNameInput.value.trim().toLowerCase())
    );
  }
  return filtered;
});

const summary = computed(() => {
  const total = filteredTransactions.value.length;
  const bankHoliday = filteredTransactions.value.filter(
    (tx) => tx.LeaveType === "BANK_HOLIDAY"
  ).length;
  // Statutory leave types
  const statutoryTypes = [
    "BANK_HOLIDAY",
    "ANNUAL_LEAVE",
    "SICK_LEAVE",
    "MATERNITY_LEAVE",
    "PATERNITY_LEAVE",
  ];
  const statutoryLeave = filteredTransactions.value.filter((tx) =>
    statutoryTypes.includes(tx.LeaveType)
  ).length;
  const additionalLeave = total - statutoryLeave;

  return {
    total,
    bankHoliday,
    statutoryLeave,
    additionalLeave,
    totalDays: stats.value.totalDays || 0,
    totalHours: stats.value.totalHours || 0,
    totalPayments: stats.value.totalPayments || 0,
  };
});

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

function leaveTypeBadgeClass(type: string) {
  if (type === "BANK_HOLIDAY")
    return "bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold";
  if (type === "ANNUAL_LEAVE")
    return "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold";
  if (type === "SICK_LEAVE")
    return "bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-semibold";
  if (type === "MATERNITY_LEAVE")
    return "bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold";
  if (type === "PATERNITY_LEAVE")
    return "bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold";
  if (type === "UNPAID_LEAVE")
    return "bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold";
  return "bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold";
}

function paymentMethodBadgeClass(method: string) {
  if (method === "ADVANCE")
    return "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold";
  if (method === "ARREARS")
    return "bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold";
  if (method === "REGULAR")
    return "bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold";
  if (method === "BONUS")
    return "bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold";
  return "bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold";
}

function searchByEmployeeName() {
  // This function is just to trigger the computed property
}
</script>

<style scoped>
/* Responsive table tweaks */
@media (max-width: 768px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }
  thead tr {
    display: none;
  }
  td {
    border: none;
    position: relative;
    padding-left: 50%;
  }
  td:before {
    position: absolute;
    left: 1rem;
    top: 0.75rem;
    white-space: nowrap;
    font-weight: 600;
    color: #6b7280;
    content: attr(data-label);
  }
}
</style>
