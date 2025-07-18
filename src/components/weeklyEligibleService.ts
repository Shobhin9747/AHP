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
import { getDailyHoursForDate } from "./dailyhoursService";

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
    const dateString = currentDate.toISOString().split("T")[0];

    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const isWorkingDay = !isWeekend;

    // Get actual hours from dailyhours.json
    const dailyHoursRecord = getDailyHoursForDate(employeeId, dateString);
    const actualHours = dailyHoursRecord ? dailyHoursRecord.HoursWorked : 0;
    const regularHours = dailyHoursRecord ? dailyHoursRecord.RegularHours : 0;
    const overtimeHours = dailyHoursRecord ? dailyHoursRecord.OvertimeHours : 0;

    // Determine daily eligibility based on hours worked
    const dailyMinHours = dailyHoursRecord ? dailyHoursRecord.DailyMinimum : 6; // Default to 6 hours
    const isDailyEligible = actualHours >= dailyMinHours;

    // Attendance status: Present if hours > 0, else Not Present (for all days)
    const attendanceStatus = actualHours > 0 ? "Present" : "Not Present";

    dailyData.push({
      date: dateString,
      dayName: currentDate.toLocaleDateString("en-US", { weekday: "short" }),
      isWorkingDay,
      isEligible: isDailyEligible,
      hours: actualHours,
      regularHours,
      overtimeHours,
      performance: isWorkingDay ? (isDailyEligible ? 85 : 60) : 0,
      attendance: actualHours > 0,
      attendanceStatus: attendanceStatus,
      notes:
        actualHours > 0
          ? `Worked ${actualHours}h (${isDailyEligible ? 'Eligible' : 'Not Eligible'})`
          : "No hours worked",
    });
  }

  // Calculate weekly eligibility based on daily results
  const workingDays = dailyData.filter(day => day.isWorkingDay);
  const eligibleDays = dailyData.filter(day => day.isEligible);
  const totalWorkingDays = workingDays.length;
  const totalEligibleDays = eligibleDays.length;
  
  // Determine weekly eligibility based on daily results
  const isWeeklyEligible = totalEligibleDays > 0; // At least one eligible day
  const eligibilityReason = totalWorkingDays > 0 
    ? `${totalEligibleDays}/${totalWorkingDays} days meet minimum requirements (${isWeeklyEligible ? 'eligible' : 'not eligible'})`
    : "No working days this week";

  return {
    employeeId: weekData.EmployeeID,
    employeeName: weekData.EmployeeName,
    weekStart: weekData.WeekStart,
    weekEnd: weekData.WeekEnd,
    isEligibleWeek: isWeeklyEligible,
    eligibilityReason: eligibilityReason,
    dailyData,
    weeklyStats: {
      totalHours: dailyData.reduce((sum, day) => sum + day.hours, 0),
      eligibleDays: totalEligibleDays,
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
