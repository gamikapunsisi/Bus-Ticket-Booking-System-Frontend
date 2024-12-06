import React from "react";
import { isNotEmpty } from "../validation/Validations";
import { useInput } from "../hooks/use-input";

const Login = () => {
  const {
    value: email,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
    reset: resetEmail,
  } = useInput("", isNotEmpty);

  const {
    value: password,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
    reset: resetPassword,
  } = useInput("", isNotEmpty);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailHasError || passwordHasError) {
      console.log("Validation failed");
      return;
    }
    console.log("Email: ", email);
    console.log("Password: ", password);

    resetEmail();
    resetPassword();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">
          Welcome Back! SLTB
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className={`mt-1 block w-full p-2 border rounded-md focus:ring ${
                emailHasError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your email"
            />
            {emailHasError && (
              <p className="mt-1 text-sm text-red-500">Email is required.</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              className={`mt-1 block w-full p-2 border rounded-md focus:ring ${
                passwordHasError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
            />
            {passwordHasError && (
              <p className="mt-1 text-sm text-red-500">Password is required.</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
