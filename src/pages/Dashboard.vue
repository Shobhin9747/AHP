<template>
  <MainLayout>
    <div
      class="min-h-screen w-full bg-gradient-to-br from-sky-100 via-rose-100 to-amber-100 p-6 pt-24"
    >
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Dashboard Overview
      </h1>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        <div
          v-for="(card, index) in dashboardCards"
          :key="index"
          class="bg-white rounded-2xl shadow hover:shadow-lg p-6 flex flex-col justify-between transition-all duration-300 group hover:scale-[1.015] cursor-pointer border border-transparent hover:border-green-400"
          @click="navigate(card.route)"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="text-4xl" :class="card.color">{{ card.icon }}</div>
            <div
              class="rounded-full px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 group-hover:bg-indigo-200 transition"
            >
              Go
            </div>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-1">
              {{ card.title }}
            </h2>
            <p class="text-gray-600 text-sm">{{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "../layout/MainLayout.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const navigate = (route) => router.push(route);

const dashboardCards = [
  {
    title: "Weekly Eligibility",
    description: "Track weekly updates",
    icon: "📅",
    color: "text-indigo-500",
    route: "/weekly-eligibility",
  },
  {
    title: "Holiday Leave Transaction",
    description: "Track leave transaction",
    icon: "📅",
    color: "text-indigo-500",
    route: "/leave-transaction",
  },
  {
    title: "AHP Results",
    description: "Analyze decision priorities",
    icon: "📝",
    color: "text-green-500",
    route: "/ahp-results",
  },
  {
    title: "UK Compliance Summary",
    description: "View UK employee compliance metrics",
    icon: "📋",
    color: "text-blue-500",
    route: "/uk-compliance",
  },
];
</script>
