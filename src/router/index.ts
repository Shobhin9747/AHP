import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import AhpResults from "../pages/AhpResults.vue";
import EmployeeWeekly from "../pages/EmployeeWeekly.vue";
import UKComplianceSummary from "../pages/UKComplianceSummary.vue";
import HolidayLeaveTransaction from "../pages/HolidayLeaveTransaction.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/ahp-results", component: AhpResults },
  { path: "/weekly-eligibility", component: EmployeeWeekly },
  { path: "/uk-compliance", component: UKComplianceSummary },
  { path: "/leave-transaction", component: HolidayLeaveTransaction },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
