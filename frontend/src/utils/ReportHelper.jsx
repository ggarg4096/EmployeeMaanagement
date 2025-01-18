export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "140px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "140px",
  },
  {
    name: "Salary",
    selector: (row) => row.salary,
    width: "140px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "140px",
  },
  {
    name: "Leave Days",
    selector: (row) => row.days,
    width: "100px",
  },
  {
    name: "Deduction",
    selector: (row) => row.deduction,
    center: "true",
  },
  {
    name: "Net Salary",
    selector: (row) => row.netSalary,
    width: "100px",
  },
];
