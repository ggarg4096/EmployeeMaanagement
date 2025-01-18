import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { columns } from "../../utils/ReportHelper";
import DataTable from "react-data-table-component";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ReportTable = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/report", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;

        // Map leave data
        const leaves = response.data.leaves.map((leave) => ({
          id: leave.employeeId._id,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          department: leave.employeeId.department.dep_name,
          days:
            leave.status === "Approved"
              ? (new Date(leave.endDate).getTime() -
                  new Date(leave.startDate).getTime()) /
                (1000 * 60 * 60 * 24)
              : 0, // Default to 0 if leave is not approved
        }));

        // Map salary data
        const salaries = response.data.salaries.reduce((acc, salary) => {
          acc[salary.employeeId] = salary.netSalary; // Map employeeId to salary
          return acc;
        }, {});
        console.log(leaves);
        // Merge leaves and salaries
        const mergedData = leaves.map((leave) => {
          const netSalary = salaries[leave.id]; // Default to 0 if no salary
          const deductionPerDay = 500; // Deduction amount per leave day
          const deduction = leave.days * deductionPerDay;
          const salaryAfterDeduction = netSalary - deduction;

          return {
            sno: sno++,
            employeeId: leave.employeeId,
            name: leave.name,
            department: leave.department,
            days: leave.days,
            salary: netSalary,
            deduction,
            netSalary: salaryAfterDeduction,
          };
        });

        setReports(mergedData);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const contentRef = useRef(null);

  const downloadPDF = () => {
    const content = contentRef.current;
    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("report.pdf");
    });
  };

  return (
    <div className="p-6" ref={contentRef}>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Reports</h3>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search By Emp Id"
          className="px-4 py-1 border rounded-md"
        />
      </div>
      <div className="mt-4" ref={contentRef}>
        <DataTable columns={columns} data={reports} pagination />
      </div>
      <div className="flex justify-center">
        <button
          className="border-b bg-green-400 mt-7 p-2 rounded-md"
          onClick={downloadPDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ReportTable;
