export interface DailyEligibility {
  date: string;
  eligible: boolean;
  hours: number;
  performance: number;
  attendance: boolean;
  notes?: string;
}

export interface WeeklyEligibility {
  employeeId: number;
  employeeName: string;
  department: string;
  weekStart: string;
  weekEnd: string;
  dailyData: DailyEligibility[];
  weeklyStats: {
    totalHours: number;
    eligibleDays: number;
    averagePerformance: number;
    attendanceRate: number;
  };
}

export const weeklyEligibleData: WeeklyEligibility[] = [
  {
    employeeId: 101,
    employeeName: "John Doe",
    department: "Engineering",
    weekStart: "2024-01-01",
    weekEnd: "2024-01-07",
    dailyData: [
      {
        date: "2024-01-01",
        eligible: true,
        hours: 8.5,
        performance: 85,
        attendance: true,
        notes: "Good performance",
      },
      {
        date: "2024-01-02",
        eligible: true,
        hours: 8.0,
        performance: 90,
        attendance: true,
        notes: "Excellent work",
      },
      {
        date: "2024-01-03",
        eligible: false,
        hours: 6.5,
        performance: 70,
        attendance: true,
        notes: "Late arrival",
      },
      {
        date: "2024-01-04",
        eligible: true,
        hours: 8.0,
        performance: 88,
        attendance: true,
        notes: "Consistent performance",
      },
      {
        date: "2024-01-05",
        eligible: true,
        hours: 7.5,
        performance: 82,
        attendance: true,
        notes: "Good day",
      },
      {
        date: "2024-01-06",
        eligible: false,
        hours: 0,
        performance: 0,
        attendance: false,
        notes: "Weekend",
      },
      {
        date: "2024-01-07",
        eligible: false,
        hours: 0,
        performance: 0,
        attendance: false,
        notes: "Weekend",
      },
    ],
    weeklyStats: {
      totalHours: 40.0,
      eligibleDays: 4,
      averagePerformance: 83.0,
      attendanceRate: 71.4,
    },
  },
  {
    employeeId: 102,
    employeeName: "Jane Smith",
    department: "Marketing",
    weekStart: "2024-01-01",
    weekEnd: "2024-01-07",
    dailyData: [
      {
        date: "2024-01-01",
        eligible: true,
        hours: 8.0,
        performance: 92,
        attendance: true,
        notes: "Outstanding work",
      },
      {
        date: "2024-01-02",
        eligible: true,
        hours: 8.5,
        performance: 95,
        attendance: true,
        notes: "Excellent performance",
      },
      {
        date: "2024-01-03",
        eligible: true,
        hours: 8.0,
        performance: 88,
        attendance: true,
        notes: "Good day",
      },
      {
        date: "2024-01-04",
        eligible: true,
        hours: 7.5,
        performance: 85,
        attendance: true,
        notes: "Consistent work",
      },
      {
        date: "2024-01-05",
        eligible: true,
        hours: 8.0,
        performance: 90,
        attendance: true,
        notes: "Strong finish",
      },
      {
        date: "2024-01-06",
        eligible: false,
        hours: 0,
        performance: 0,
        attendance: false,
        notes: "Weekend",
      },
      {
        date: "2024-01-07",
        eligible: false,
        hours: 0,
        performance: 0,
        attendance: false,
        notes: "Weekend",
      },
    ],
    weeklyStats: {
      totalHours: 40.0,
      eligibleDays: 5,
      averagePerformance: 90.0,
      attendanceRate: 71.4,
    },
  },
  {
    employeeId: 103,
    employeeName: "Mike Johnson",
    department: "Sales",
    weekStart: "2024-01-01",
    weekEnd: "2024-01-07",
    dailyData: [
      {
        date: "2024-01-01",
        eligible: false,
        hours: 4.0,
        performance: 60,
        attendance: true,
        notes: "Half day - personal",
      },
      {
        date: "2024-01-02",
        eligible: true,
        hours: 8.0,
        performance: 78,
        attendance: true,
        notes: "Back to full schedule",
      },
      {
        date: "2024-01-03",
        eligible: true,
        hours: 8.5,
        performance: 82,
        attendance: true,
        notes: "Improving performance",
      },
      {
        date: "2024-01-04",
        eligible: false,
        hours: 0,
        performance: 0,
        attendance: false,
        notes: "Sick day",
      },
      {
        date: "2024-01-05",
        eligible: true,
        hours: 8.0,
        performance: 80,
        attendance: true,
        notes: "Recovered well",
      },
      {
        date: "2024-01-06",
        eligible: false,
        hours: 0,
        performance: 0,
        attendance: false,
        notes: "Weekend",
      },
      {
        date: "2024-01-07",
        eligible: false,
        hours: 0,
        performance: 0,
        attendance: false,
        notes: "Weekend",
      },
    ],
    weeklyStats: {
      totalHours: 28.5,
      eligibleDays: 3,
      averagePerformance: 75.0,
      attendanceRate: 57.1,
    },
  },
];
