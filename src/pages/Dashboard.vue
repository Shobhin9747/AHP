<template>
  <MainLayout>
    <div
      class="min-h-screen w-full bg-gradient-to-br from-sky-100 via-rose-100 to-amber-100 p-6 pt-20"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(card, index) in dashboardCards"
          :key="index"
          class="bg-gradient-to-br from-pink-100 via-amber-100 to-rose-100 rounded-2xl shadow-md p-6 flex items-center justify-between cursor-pointer transition duration-300 hover:shadow-xl hover:brightness-105"
          @click="navigate(card.route)"
        >
          <div>
            <h2 class="text-xl font-semibold text-gray-800">
              {{ card.title }}
            </h2>
            <p class="text-gray-600">{{ card.description }}</p>
          </div>
          <div :class="[card.color, 'text-4xl drop-shadow']">
            {{ card.icon }}
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "../layout/MainLayout.vue";
const dashboardCards = [
  // {
  //   title: "Employees",
  //   description: "View and manage employees",
  //   icon: "👥",
  //   color: "text-blue-500",
  //   route: "/employees",
  // },
  {
    title: "Weekly Eligibility",
    description: "Track weekly updates",
    icon: "📅",
    color: "text-indigo-500",
    route: "/weekly-eligibility",
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

import { useRouter } from "vue-router";

const router = useRouter();

const navigate = (route) => {
  router.push(route);
};
</script>
