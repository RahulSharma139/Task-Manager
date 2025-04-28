import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SignUpImg from "../assets/signup-img.jpg";
import { signupUser } from "../utils/signUpUtils";

type SignUpFormInputs = {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  // Watch for the password and confirm password fields
  const password = watch("password");
  const confirmpassword = watch("confirmpassword");

  // Function to check if passwords match
  const isPasswordsMatch = password === confirmpassword;

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const response = await signupUser(data);
      console.log("Signup success:", response.message);
      alert("Registration successful!");
      navigate("/taskmanager");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error instanceof Error ? error.message : "Signup failed. Try again.");
    }
  };

  return (
    <div className="bg-black bg-opacity-80 min-h-screen flex items-center justify-center py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 bg-gradient-to-r from-stone-700 to-stone-900">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-green-600">
              Sign Up
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6 animate-fade-in rounded-lg shadow-2xl p-4"
            >
              {/* Name */}
              <div>
                <label className="block font-medium text-white mb-2">Name</label>
                <input
                  {...register("username", { required: "Name is required" })}
                  placeholder="Your full name"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium text-white mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block font-medium text-white mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block font-medium text-white mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmpassword", {
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className={`w-full p-3 border rounded focus:outline-none focus:ring-2 transition-all ${
                    isPasswordsMatch ? "border-green-500" : "border-red-500"
                  }`}
                />
                {errors.confirmpassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmpassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded w-full transition-colors duration-200 mt-2"
              >
                Sign Up
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
                <p className="text-white">Already have an account?</p>
                <Link
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  to="/login"
                >
                  Login Here
                </Link>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden md:block md:w-1/2">
            <img
              className="w-full h-full object-cover animate-pulse"
              src={SignUpImg}
              alt="Sign up illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
