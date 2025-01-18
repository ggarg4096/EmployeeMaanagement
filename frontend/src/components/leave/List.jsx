import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAuth } from "../../context/authContext";

const List = () => {
  const [leaves, setLeaves] = useState([]);
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `https://employeemaanagement.onrender.com/api/leave/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);

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
    <div className="p-6" ref={contentRef}>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-4 py-0.5 border"
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-1 bg-blue-500 rounded text-white"
          >
            Add New Leave
          </Link>
        )}
      </div>
      <div>
        <table className="w-full text-sm text-left text-gray-500 mt-3">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Applied Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leaves) => (
              <tr
                key={leaves._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{leaves.LeaveType}</td>
                <td className="px-6 py-3">
                  {new Date(leaves.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {new Date(leaves.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{leaves.reason}</td>
                <td className="px-6 py-3">
                  {new Date(leaves.appliedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{leaves.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default List;
