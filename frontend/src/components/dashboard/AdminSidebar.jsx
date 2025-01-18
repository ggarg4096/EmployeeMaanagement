import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCogs,
  FaTachometerAlt,
  FaUsers,
  FaFileAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-slate-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-blue-500 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center">Employee MS</h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            } flex items-center spase-x-4  py-2.5 px-4 rounded`
          }
          end
        >
          <FaTachometerAlt />
          <span className="pl-2">Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            } flex items-center spase-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            } flex items-center spase-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <span className="pl-2">Departments</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            } flex items-center spase-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaCalendarAlt />
          <span className="pl-2">Leave</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            } flex items-center spase-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaMoneyBillWave />
          <span className="pl-2">Salary</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/setting"
          className="flex items-center spase-x-4 py-2.5 px-4 rounded"
        >
          <FaCogs />
          <span className="pl-2">Settings</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/report"
          className="flex items-center spase-x-4 py-2.5 px-4 rounded"
        >
          <FaFileAlt />
          <span className="pl-2">Report</span>
        </NavLink>
      </div>
    </div>
  ); //admin@gmail.com
};

export default AdminSidebar;
