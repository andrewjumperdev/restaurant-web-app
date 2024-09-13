"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
   
    try {
      const loginSuccess = await login(email, password);
   
      if (loginSuccess) {
        router.push("/");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    }
  }   


  return (
    <div className="min-h-screen flex flex-col justify-center max-w-lg mx-auto p-10 bg-white shadow-lg rounded-lg sm:justify-center">
      <h2 className="text-2xl font-semibold mb-4">Hi, Welcome Back! 👋</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-500 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-500 rounded-lg"
          />
        </div>

        <div className="flex justify-between my-4">
          <div>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label> Remember Me</label>
          </div>
          <Link href={"#"} className="text-red-600">Forgot Password?</Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <div className="max-w-md bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center my-4">
          <hr className="border-t border-gray-300 flex-grow" />
          <span className="px-4 text-gray-500">OR With</span>
          <hr className="border-t border-gray-300 flex-grow" />
        </div>

        <div className="flex flex-col">
          <button className="flex items-center justify-center my-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22 12a10 10 0 10-11.5 9.87v-7H8v-3h2.5V9.59c0-2.48 1.48-3.87 3.75-3.87 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.61.77-1.61 1.55V12H18l-.5 3h-2.5v7A10 10 0 0022 12z" />
            </svg>
            Login with Facebook
          </button>
          <button className="flex items-center justify-center my-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21.35 11.1H12v3.69h5.34A4.64 4.64 0 0112 16.34 4.68 4.68 0 017.31 12 4.67 4.67 0 0112 7.66a4.53 4.53 0 012.83 1l2.67-2.68A8.06 8.06 0 0012 4a8 8 0 100 16c4.41 0 8-3.59 8-8a7.73 7.73 0 00-.65-2.9z" />
            </svg>
            Login with Google
          </button>
        </div>
      </div>
      <div className="text-center">
        <p>
            Dont have an account?{" "}
            <Link 
                href={"/signup"}
                className="text-blue-500"
            >
                Sign Up
            </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
