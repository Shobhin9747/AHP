import ahpData from "./ahp.json";
import ahpResults from "./ahpResults.json";

export interface HolidayLeaveTransaction {
  TransactionId: number;
  EmployeeId: number;
  CompanyId: number;
  LeaveDate: string;
  LeaveDays: number;
  LeaveHours: number;
  LeaveType: string;
  PaymentMethod: string;
  BasicPay: number;
  AHPAmount: number;
  TotalPayment: number;
  ReferenceWeekStart: string;
  ReferenceWeekEnd: string;
  PayPeriod: string;
  IsStatutoryEntitlement: boolean;
  CreatedDate: string;
}

export interface AHPData {
  HolidayLeaveTransactions: HolidayLeaveTransaction[];
}

// --- Employee Name Mapping ---
interface EmployeeResult {
  EmployeeID: number;
  EmployeeName: string;
}

function buildEmployeeIdNameMap(): Record<number, string> {
  const results = (ahpResults["AHP Results"] || []) as EmployeeResult[];
  const map: Record<number, string> = {};
  for (const r of results) {
    map[r.EmployeeID] = r.EmployeeName;
  }
  return map;
}

const employeeIdNameMap = buildEmployeeIdNameMap();

export function getEmployeeNameById(id: number): string {
  return employeeIdNameMap[id] || `Employee #${id}`;
}

// --- Existing code below ---
const ahpJsonData: AHPData = ahpData as AHPData;

export const getAllHolidayLeaveTransactions = (): HolidayLeaveTransaction[] => {
  return ahpJsonData.HolidayLeaveTransactions || [];
};

export const getHolidayLeaveTransactionsForEmployee = (
  employeeId: number
): HolidayLeaveTransaction[] => {
  return getAllHolidayLeaveTransactions()
    .filter((transaction) => transaction.EmployeeId === employeeId)
    .sort(
      (a, b) =>
        new Date(a.LeaveDate).getTime() - new Date(b.LeaveDate).getTime()
    );
};

export const getHolidayLeaveTransactionsByType = (
  leaveType: string
): HolidayLeaveTransaction[] => {
  return getAllHolidayLeaveTransactions().filter(
    (transaction) => transaction.LeaveType === leaveType
  );
};

export const getHolidayLeaveTransactionsByDateRange = (
  startDate: string,
  endDate: string
): HolidayLeaveTransaction[] => {
  return getAllHolidayLeaveTransactions().filter((transaction) => {
    const transactionDate = new Date(transaction.LeaveDate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactionDate >= start && transactionDate <= end;
  });
};

export const getHolidayLeaveStats = () => {
  const transactions = getAllHolidayLeaveTransactions();

  const totalTransactions = transactions.length;
  const totalDays = transactions.reduce((sum, tx) => sum + tx.LeaveDays, 0);
  const totalHours = transactions.reduce((sum, tx) => sum + tx.LeaveHours, 0);
  const totalPayments = transactions.reduce(
    (sum, tx) => sum + tx.TotalPayment,
    0
  );

  // Group by leave type
  const leaveTypeStats = transactions.reduce((acc, tx) => {
    acc[tx.LeaveType] = (acc[tx.LeaveType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group by payment method
  const paymentMethodStats = transactions.reduce((acc, tx) => {
    acc[tx.PaymentMethod] = (acc[tx.PaymentMethod] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalTransactions,
    totalDays,
    totalHours,
    totalPayments,
    leaveTypeStats,
    paymentMethodStats,
    averageDaysPerTransaction:
      totalTransactions > 0 ? totalDays / totalTransactions : 0,
    averageHoursPerTransaction:
      totalTransactions > 0 ? totalHours / totalTransactions : 0,
    averagePaymentPerTransaction:
      totalTransactions > 0 ? totalPayments / totalTransactions : 0,
  };
};

export const getEmployeeHolidayLeaveStats = (employeeId: number) => {
  const employeeTransactions =
    getHolidayLeaveTransactionsForEmployee(employeeId);

  const totalTransactions = employeeTransactions.length;
  const totalDays = employeeTransactions.reduce(
    (sum, tx) => sum + tx.LeaveDays,
    0
  );
  const totalHours = employeeTransactions.reduce(
    (sum, tx) => sum + tx.LeaveHours,
    0
  );
  const totalPayments = employeeTransactions.reduce(
    (sum, tx) => sum + tx.TotalPayment,
    0
  );

  return {
    totalTransactions,
    totalDays,
    totalHours,
    totalPayments,
    averageDaysPerTransaction:
      totalTransactions > 0 ? totalDays / totalTransactions : 0,
    averageHoursPerTransaction:
      totalTransactions > 0 ? totalHours / totalTransactions : 0,
    averagePaymentPerTransaction:
      totalTransactions > 0 ? totalPayments / totalTransactions : 0,
  };
};

// Helper function to format leave type for display
export const formatLeaveType = (leaveType: string): string => {
  const typeMap: Record<string, string> = {
    BANK_HOLIDAY: "Bank Holiday",
    ANNUAL_LEAVE: "Annual Leave",
    SICK_LEAVE: "Sick Leave",
    MATERNITY_LEAVE: "Maternity Leave",
    PATERNITY_LEAVE: "Paternity Leave",
    UNPAID_LEAVE: "Unpaid Leave",
    COMPASSIONATE_LEAVE: "Compassionate Leave",
    STUDY_LEAVE: "Study Leave",
  };

  return typeMap[leaveType] || leaveType.replace("_", " ");
};

// Helper function to format payment method for display
export const formatPaymentMethod = (paymentMethod: string): string => {
  const methodMap: Record<string, string> = {
    ADVANCE: "Advance Payment",
    ARREARS: "Payment in Arrears",
    REGULAR: "Regular Payment",
    BONUS: "Bonus Payment",
  };

  return methodMap[paymentMethod] || paymentMethod;
};
