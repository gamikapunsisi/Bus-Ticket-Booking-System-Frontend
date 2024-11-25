import React from "react";
import { BsBusFrontFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { isNotEmpty } from "../validation/Validations";
import { useInput } from "../hooks/use-input";

const Login = () => {
  const {
    value: email,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
    setValue: setEmail,
    reset: resetEmail,
  } = useInput("", isNotEmpty);

  const {
    value: password,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
    setValue: setPassword,
    reset: resetPassword,
  } = useInput("", isNotEmpty);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }

    console.log("Email: ", email);
    console.log("Password", password);
  };

  return (
    <div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
      <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex items-center gap-2 ">
          <h1 className=" max-[400px]:text-xl text-6xl font-bold text-gray-700 font-mono">
            SLTS
          </h1>
          <BsBusFrontFill className="max-[400px]:text-lg  text-6xl text-blue-600" />
        </div>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight to-blue-500">
          Sign In
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              for="email"
              className="block text-sm font-medium leading-6 text-balance"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                value={email}
                className="block w-full px-2 rounded-md border-0 bg-white/5 py-1.5 text-cyan-600 shadow-sm ring-1 ring-inset ring-red-500 focus:ring-2 focus:ring-inset focus:ring-balck sm:text-sm sm:leading-6"
              />
              {emailHasError && (
                <p className="mt-1 font-sans text-sm font-normal text-red-500">
                  Email is required
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                for="password"
                className="block text-sm font-medium leading-6 text-black"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                value={password}
                className="block w-full px-2 rounded-md border-0 bg-white/5 py-1.5 text-cyan-600 shadow-sm ring-1 ring-inset ring-red-500 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
              {passwordHasError && (
                <p className="mt-1 font-sans text-sm font-normal text-red-500">
                  Password is required
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold leading-6 text-red-500 hover:text-red-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
