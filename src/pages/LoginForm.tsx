import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Form Data:", data);
    // handle login logic here
  };

  return (
    <div className="container rounded-lg shadow-md h-[900px] pl-10">
      <div className="grid grid-cols-2 items-center justify-center h-screen">
        <div className="rounded-2xl shadow-lg p-4 ml-24 w-[500px]">
          <h2 className="font-bold text-center text-6xl pb-4 text-green-600">
            Login
          </h2>
          <form className="space-y-4 animate-fade-in" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div>
              <label className="block font-medium" htmlFor="email">
                Email
              </label>
              <input
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block font-medium" htmlFor="password">
                Password
              </label>
              <input
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
            </div>
            <button
              className="bg-blue-600 py-2 px-4 font-medium text-white w-full"
              type="submit"
            >
              Login
            </button>
            <div className="text-center  ">
              <span>
                I don't have a Account{" "}
                <Link className="text-blue-600" to="/signup">
                  Create a account
                </Link>
              </span>
            </div>
          </form>
        </div>
        <div>
          <img
            className="w-full h-[800px] animate-pulse"
            src="src/assets/LoginImg.png"
            alt="loginImg"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
