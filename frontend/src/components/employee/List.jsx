import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(
          "https://employeemaanagement.onrender.com/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            role: emp.userId.role,
            profileImage: (
              <img
                width={40}
                className="rounded-full h-10"
                src={`http://localhost:5000/${emp.userId.profileImage}`}
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.error) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-4 py-0.5 border"
        />
        <Link
          to="/admin-dashboard/employees/add-employee"
          className="px-4 py-1 bg-blue-500 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={employees} pagination />
      </div>
    </div>
  );
};

export default List;
