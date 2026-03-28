import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.userName.trim()) errs.userName = "Username is required";
    if (!formData.password) errs.password = "Password is required";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const success = await login(formData);
    if (success) navigate("/");
  };

  const inputCls = (field) =>
    "w-full bg-white border " +
    (errors[field] ? "border-red-400" : "border-gray-300") +
    " rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 " +
    "focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors duration-150";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
          <div className="px-8 py-8">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-800">Sign in</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="User name"
                  autoComplete="username"
                  className={inputCls("userName")}
                />
                {errors.userName && (
                  <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Your password"
                    autoComplete="current-password"
                    className={`${inputCls("password")} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {show ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                           text-white font-semibold py-2.5 rounded-lg text-sm transition-colors duration-150
                           active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
              >
                {isLoggingIn ? (
                  <>
                    <span className="w-4 h-4 border-2 border-blue-300 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
