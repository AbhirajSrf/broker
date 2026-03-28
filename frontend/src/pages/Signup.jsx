import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({ password: false, confirm: false });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.userName.trim()) errs.userName = "Username is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Enter a valid email address";
    if (!formData.password) errs.password = "Password is required";
    else if (formData.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
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
    const { confirmPassword, ...payload } = formData;
    try {
      const success = await signup(payload);
      if (success) navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "";
      if (message === "Email already taken") {
        setErrors((prev) => ({ ...prev, email: "Email already taken" }));
      } else if (message === "Username already taken") {
        setErrors((prev) => ({ ...prev, userName: "Username already taken" }));
      }
    }
  };

  const inputCls = (field) =>
    "w-full bg-white border " +
    (errors[field] ? "border-red-400" : "border-gray-300") +
    " rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 " +
    "focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors duration-150";

  const fields = [
    {
      name: "fullName",
      label: "Full name",
      type: "text",
      placeholder: "Jane Smith",
      auto: "name",
    },
    {
      name: "userName",
      label: "Username",
      type: "text",
      placeholder: "jane_smith",
      auto: "username",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "example@gmail.com",
      auto: "email",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
          <div className="px-8 py-8">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-800">
                Create account
              </h1>
              <p className="text-sm text-gray-500 mt-1">Get started today</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {fields.map(({ name, label, type, placeholder, auto }) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    autoComplete={auto}
                    className={inputCls(name)}
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={show.password ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
                    className={`${inputCls("password")} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShow((s) => ({ ...s, password: !s.password }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {show.password ? (
                      <FaEyeSlash size={14} />
                    ) : (
                      <FaEye size={14} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={show.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className={`${inputCls("confirmPassword")} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShow((s) => ({ ...s, confirm: !s.confirm }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {show.confirm ? (
                      <FaEyeSlash size={14} />
                    ) : (
                      <FaEye size={14} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSigningUp}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                           text-white font-semibold py-2.5 rounded-lg text-sm transition-colors duration-150
                           active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
              >
                {isSigningUp ? (
                  <>
                    <span className="w-4 h-4 border-2 border-blue-300 border-t-white rounded-full animate-spin" />
                    Creating account…
                  </>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
