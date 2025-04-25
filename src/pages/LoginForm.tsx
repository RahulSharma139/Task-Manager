import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import SignUpImg from "../assets/signup-img.jpg"

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
   <div className="bg-black bg-opacity-80 h-screen">
     <div className="container rounded-lg shadow-md h-[900px] pl-10">
      <div className="grid grid-cols-2 items-center justify-center h-screen ">
        <div className="rounded-2xl shadow-2xl p-4 ml-24 w-[500px] bg-gradient-to-r from-stone-600 to-stone-900">
          <h2 className="font-bold text-center text-6xl pb-4 text-green-600">
            Login
          </h2>
          <form className="space-y-4 animate-fade-in" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div>
              <label className="block font-medium text-white mb-2" htmlFor="email">
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
              <label className="block font-medium text-white mb-2" htmlFor="password">
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
            <div className="flex items-center justify-center gap-2">
              <p className="text-white">
                I don't have a Account
              </p>
                <Link className="text-blue-600" to="/signup">
                  Create a account
                </Link>
            </div>
          </form>
        </div>
        <div>
          <img
            className="w-full h-[800px] animate-pulse text-white"
            src={SignUpImg}
            alt="loginImg"
          />
        </div>
      </div>
    </div>
   </div>
  );
};

export default LoginForm;
