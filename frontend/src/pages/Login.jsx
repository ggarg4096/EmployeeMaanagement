import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://employeemaanagement.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        login(response.data.user);
        console.log(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } // } else {
      //   setError("Server Error");
      // }
    }
  };
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-br from-blue-600 from-70% to-blue-100 from-30%">
      <h2 className="text-3xl text-white pb-4">Employee Management System</h2>
      <form className="border shadow p-3 w-80 bg-white" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">LogIn</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-blue-500 text-xl">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-blue-500 text-xl">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2 text-blue-500">Remember me</span>
          </label>
          <a href="#" className="text-teal-600">
            Forgot password?
          </a>
        </div>
        <div className="mb-4">
          <button type="submit" className="w-full bg-blue-500 text-white py-2">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
