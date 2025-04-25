import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import SignUpImg from "../assets/signup-img.jpg"

type SignUpFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    console.log("Signup Data:", data);
    // handle sign-up logic here (e.g., API call)
  };

  const password = watch("password");

  return (
    <div className="bg-black bg-opacity-80 h-screen">
      <div className="container rounded-lg shadow-md h-[900px] pl-10 animate-fade-in ">
      <div className="grid grid-cols-2 items-center justify-center">
        <div className="rounded-2xl shadow-lg p-4 ml-24 w-[500px] bg-gradient-to-r from-stone-600 to-stone-900">
          <h2 className="text-6xl font-bold mb-4 text-center text-green-600">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
            {/* Name */}
            <div>
              <label className="block font-medium text-white mb-2">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium text-white mb-2">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium text-white mb-2">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-medium text-white mb-2">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded w-full"
            >
              Sign Up
            </button>
            <div className="flex items-center justify-center gap-2">
              <p className="text-white">
                Already have an account?
              </p>
                <Link className="text-blue-600" to="/login">
                  Login Here
                </Link>
            </div>
          </form>
        </div>
        <div>
          <img
            className="w-full h-[800px] animate-pulse mt-10 text-white"
            src={SignUpImg}
            alt="signupImg"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignupForm;
