export interface WeeklyEligibilityRecord {
  EmployeeID: number;
  EmployeeName: string;
  EligibilityType: string;
  WeekStart: string;
  WeekEnd: string;
  IsEligibleWeek: boolean;
  EligibilityReason: string;
}

export interface WeeklyEligibilityData {
  "Weekly Eligibility": WeeklyEligibilityRecord[];
}

// Import the JSON data
import weeklyEligibleJson from "./weeklyeligible.json";

export const weeklyEligibleData: WeeklyEligibilityData =
  weeklyEligibleJson as WeeklyEligibilityData;

// Helper functions
export const getUniqueEmployees = () => {
  const employees = new Map<number, string>();
  weeklyEligibleData["Weekly Eligibility"].forEach((record) => {
    employees.set(record.EmployeeID, record.EmployeeName);
  });
  return Array.from(employees.entries()).map(([id, name]) => ({ id, name }));
};

export const getWeeksForEmployee = (employeeId: number) => {
  return weeklyEligibleData["Weekly Eligibility"]
    .filter((record) => record.EmployeeID === employeeId)
    .sort(
      (a, b) =>
        new Date(a.WeekStart).getTime() - new Date(b.WeekStart).getTime()
    );
};

export const getEligibilityStats = () => {
  const totalRecords = weeklyEligibleData["Weekly Eligibility"].length;
  const eligibleWeeks = weeklyEligibleData["Weekly Eligibility"].filter(
    (record) => record.IsEligibleWeek
  ).length;
  const ineligibleWeeks = totalRecords - eligibleWeeks;

  return {
    totalRecords,
    eligibleWeeks,
    ineligibleWeeks,
    eligibilityRate: (eligibleWeeks / totalRecords) * 100,
  };
};

export const getWeeklyBreakdown = (employeeId: number, weekStart: string) => {
  const weekData = weeklyEligibleData["Weekly Eligibility"].find(
    (record) =>
      record.EmployeeID === employeeId && record.WeekStart === weekStart
  );

  if (!weekData) return null;

  // Create daily breakdown for the week
  const startDate = new Date(weekData.WeekStart);
  const dailyData = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const isWorkingDay = !isWeekend;

    dailyData.push({
      date: currentDate.toISOString().split("T")[0],
      dayName: currentDate.toLocaleDateString("en-US", { weekday: "short" }),
      isWorkingDay,
      isEligible: weekData.IsEligibleWeek && isWorkingDay,
      hours: isWorkingDay ? (weekData.IsEligibleWeek ? 8 : 0) : 0,
      performance: isWorkingDay ? (weekData.IsEligibleWeek ? 85 : 60) : 0,
      attendance: isWorkingDay,
      notes: isWeekend
        ? "Weekend"
        : weekData.IsEligibleWeek
        ? "Eligible day"
        : weekData.EligibilityReason,
    });
  }

  return {
    employeeId: weekData.EmployeeID,
    employeeName: weekData.EmployeeName,
    weekStart: weekData.WeekStart,
    weekEnd: weekData.WeekEnd,
    isEligibleWeek: weekData.IsEligibleWeek,
    eligibilityReason: weekData.EligibilityReason,
    dailyData,
    weeklyStats: {
      totalHours: dailyData.reduce((sum, day) => sum + day.hours, 0),
      eligibleDays: dailyData.filter((day) => day.isEligible).length,
      averagePerformance:
        dailyData
          .filter((day) => day.isWorkingDay)
          .reduce((sum, day) => sum + day.performance, 0) /
        Math.max(dailyData.filter((day) => day.isWorkingDay).length, 1),
      attendanceRate:
        (dailyData.filter((day) => day.attendance).length / dailyData.length) *
        100,
    },
  };
};
