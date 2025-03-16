import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        { email, password },
        { withCredentials: true } 
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.data.user.role === "owner") {
        navigate("/schedule");
      } else if (response.data.user.role === "Member") {
        navigate("/user");
      } else {
        setError("Invalid user role.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold leading-6 tracking-tighter">
            Login
          </h3>
          <p className="mt-1.5 text-sm font-medium text-white/50">
            Welcome back, enter your credentials to continue.
          </p>

          <form onSubmit={handleLogin} className="mt-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Email Input */}
            <div className="mt-3">
              <div className="group relative rounded-lg border px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <label className="text-xs font-medium text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="off"
                  className="block w-full bg-transparent p-0 text-sm placeholder-gray-500 focus:outline-none focus:ring-0 text-white"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mt-4">
              <div className="group relative rounded-lg border px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <label className="text-xs font-medium text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full bg-transparent p-0 text-sm placeholder-gray-500 focus:outline-none focus:ring-0 text-white"
                  required
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <a
                className="text-sm font-medium text-foreground underline"
                href="/forgot-password"
              >
                Forgot password?
              </a>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex items-center justify-end gap-x-2">
              <a
                className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-gray-700 transition-all px-4 py-2"
                href="/register"
              >
                Register
              </a>
              <button
                className="font-semibold bg-white text-black rounded-md px-4 py-2 hover:bg-black hover:text-white transition-all"
                type="submit"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}