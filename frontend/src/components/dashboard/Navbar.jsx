import { useAuth } from "../../context/authContext";
const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex items-center text-white justify-between h-12 bg-blue-500 px-6">
      <p>Welcome {user.name}</p>
      <button className="px-4 py-1 bg-blue-800 hover:bg-blue-900" onClick={()=> logout()}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
