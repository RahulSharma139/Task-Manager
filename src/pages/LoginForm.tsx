import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SignUpImg from "../assets/signup-img.jpg";
import { loginUser } from "../utils/loginUtils";
import { toast } from "react-toastify";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const navigate= useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const result = await loginUser(data);
      localStorage.setItem("token", result.token);
      toast.success("Logged in successfully!");
      console.log(localStorage.getItem("token"))
      navigate("/taskmanager");
    } catch (error) {
      console.error("Login error:", error);
      alert(
        error instanceof Error ? error.message : "Login failed, please try again later."
      );
    }
  };

  return (
    <div className="bg-black bg-opacity-80 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row bg-gradient-to-r from-stone-700 to-stone-900 rounded-xl overflow-hidden shadow-2xl">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-6 md:p-10">
            <h2 className="font-bold text-center text-4xl md:text-5xl lg:text-6xl pb-4 text-green-600">
              Login
            </h2>

            <form
              className="space-y-6 animate-fade-in rounded-lg shadow-2xl p-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Email Field */}
              <div>
                <label
                  className="block font-medium text-white mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  className="block font-medium text-white mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                className="bg-blue-600 hover:bg-blue-700 py-3 px-4 font-medium text-white w-full rounded transition-colors duration-200"
                type="submit"
              >
                Login
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
                <p className="text-white">Don't have an account?</p>
                <Link
                  className="text-blue-400 hover:text-blue-300"
                  to="/signup"
                >
                  Create an account
                </Link>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden md:block md:w-1/2">
            <img
              className="w-full h-full object-cover animate-pulse"
              src={SignUpImg}
              alt="Login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
