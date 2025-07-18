export interface DailyHoursRecord {
  EmployeeId: number;
  CompanyId: number;
  Date: string;
  WeekNumber: number;
  DayOfWeek: string;
  IsWorkingDay: boolean;
  WorkStartTime: string;
  WorkEndTime: string;
  OperatingStartTime: string;
  OperatingEndTime: string;
  RegularHours: number;
  OvertimeHours: number;
  HoursWorked: number;
  IsOvertimeDay: boolean;
  ClassificationType: string;
  CalculationMethod: string;
  DailyMinimum: number;
  StatutoryDailyMinimum: number;
  EmploymentBasis: string;
  MeetsCalculatedMin: boolean;
  MeetsStatutoryMin: boolean;
}

export interface DailyHoursData {
  "DailyWorkedHours": DailyHoursRecord[];
}

// Import the JSON data
import dailyHoursJson from "./dailyhours.json";

export const dailyHoursData: DailyHoursData = dailyHoursJson as DailyHoursData;

// Helper functions
export const getDailyHoursForEmployee = (employeeId: number, weekStart: string, weekEnd: string) => {
  const startDate = new Date(weekStart);
  const endDate = new Date(weekEnd);
  
  return dailyHoursData["DailyWorkedHours"]
    .filter((record) => {
      const recordDate = new Date(record.Date);
      return record.EmployeeId === employeeId && 
             recordDate >= startDate && 
             recordDate <= endDate;
    })
    .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
};

export const getDailyHoursForDate = (employeeId: number, date: string) => {
  return dailyHoursData["DailyWorkedHours"].find(
    (record) => record.EmployeeId === employeeId && record.Date === date
  );
};

export const getTotalHoursForWeek = (employeeId: number, weekStart: string, weekEnd: string) => {
  const weekHours = getDailyHoursForEmployee(employeeId, weekStart, weekEnd);
  return weekHours.reduce((total, record) => total + (record.HoursWorked || 0), 0);
}; 