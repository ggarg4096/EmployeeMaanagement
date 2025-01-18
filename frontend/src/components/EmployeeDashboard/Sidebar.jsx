import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaFileAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div className="bg-slate-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-blue-500 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center">Employee MS</h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/employee-dashboard"
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
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            } flex items-center spase-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaUsers />
          <span>My profile</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            } flex items-center spase-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <span className="pl-2">Leaves</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            } flex items-center spase-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaCalendarAlt />
          <span className="pl-2">Salary</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            } flex items-center spase-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaCogs />
          <span className="pl-2">Settings</span>
        </NavLink>
        {/* <NavLink
          to="/employee-dashboard/report"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            } flex items-center spase-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaFileAlt />
          <span className="pl-2">Report</span>
        </NavLink> */}
      </div>
    </div>
  );
};

export default Sidebar;
