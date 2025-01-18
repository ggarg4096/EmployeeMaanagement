import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredleaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        "https://employeemaanagement.onrender.com/api/leave",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          LeaveType: leave.LeaveType,
          department: leave.employeeId.department.dep_name,

          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.error) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const contentRef = useRef(null);

  const downloadPDF = () => {
    const content = contentRef.current; // Target the specific element
    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("document.pdf");
    });
  };

  return (
    <>
      {filteredleaves ? (
        <div className="p-6" ref={contentRef}>
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="px-4 py-0.5 border"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button
                className="px-2 py-1 bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-2 py-1 bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-2 py-1 bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-4">
            <DataTable columns={columns} data={filteredleaves} pagination />
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
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default Table;
