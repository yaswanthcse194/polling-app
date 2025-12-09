import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import AuthInput from '../../components/input/AuthInput';
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from "../../context/UserContext";

const LoginForm = () => {
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [error, setError]= useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate =useNavigate()

  // handle login form submit
  const handleLogin = async (e) =>{
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a valid email address. ");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setIsLoading(true);

    // Login api
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center px-4 sm:px-6">
        {/* Header Section */}
        <div className="mb-8 animate-fadeIn">
          <h3 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-600 mt-2 font-medium">
            Please enter your details to Log in
          </p>
          <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-4"></div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleLogin} className="space-y-5 animate-slideUp">
          {/* Email Input */}
          <div className="transition-all duration-300 hover:shadow-sm">
            <AuthInput
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="name@example.com"
              type="text"
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="transition-all duration-300 hover:shadow-sm">
            <AuthInput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="animate-shake p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full btn-primary py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${
              isLoading
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              'LOGIN'
            )}
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-slate-700 pt-4 border-t border-slate-200">
            Don't have an account?{" "}
            <Link
              className="font-semibold text-cyan-500 hover:text-cyan-600 underline transition-colors duration-300"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out 0.2s backwards;
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </AuthLayout>
  );
};

export default LoginForm
