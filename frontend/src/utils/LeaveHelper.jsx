import { useNavigate } from "react-router-dom";

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
    name: "Leave Type",
    selector: (row) => row.LeaveType,
    width: "140px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "140px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "80px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "140px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  return (
    <button
      className="px-4 py-1 bg-blue-500 rounded text-white hover:bg-blue-600"
      onClick={() => handleView(Id)}
    >
      View
    </button>
  );
};
