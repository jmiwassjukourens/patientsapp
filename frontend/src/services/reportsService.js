export const reportsService = {
  getAnualReport(year = 2025) {
    return {
      year,
      monthlyData: [
        { month: "Enero", totalIncome: 12000, collectedIncome: 10000, pendingIncome: 2000 },
        { month: "Febrero", totalIncome: 11500, collectedIncome: 9700, pendingIncome: 1800 },
        { month: "Marzo", totalIncome: 13000, collectedIncome: 11000, pendingIncome: 2000 },
        { month: "Abril", totalIncome: 12500, collectedIncome: 10000, pendingIncome: 2500 },
        { month: "Mayo", totalIncome: 14000, collectedIncome: 11500, pendingIncome: 2500 },
        { month: "Junio", totalIncome: 13500, collectedIncome: 12000, pendingIncome: 1500 },
        { month: "Julio", totalIncome: 14500, collectedIncome: 12500, pendingIncome: 2000 },
        { month: "Agosto", totalIncome: 15000, collectedIncome: 13000, pendingIncome: 2000 },
        { month: "Septiembre", totalIncome: 15500, collectedIncome: 14000, pendingIncome: 1500 },
        { month: "Octubre", totalIncome: 16000, collectedIncome: 14500, pendingIncome: 1500 },
        { month: "Noviembre", totalIncome: 17000, collectedIncome: 15000, pendingIncome: 2000 },
        { month: "Diciembre", totalIncome: 18000, collectedIncome: 16000, pendingIncome: 2000 },
      ],
    };
  },
};
