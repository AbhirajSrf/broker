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
    await signup(payload);
    navigate("/login");
  };

  const inputCls = (field) =>
    "w-full bg-zinc-900 border " +
    (errors[field] ? "border-rose-500" : "border-zinc-700") +
    " rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 " +
    "focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors duration-150";

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
      placeholder: "jane@example.com",
      auto: "email",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-10">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-8">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-7">
              <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
              </div>
              <span className="text-zinc-100 font-semibold tracking-tight text-lg">
                YourApp
              </span>
            </div>

            <h1 className="text-2xl font-bold text-zinc-50 tracking-tight">
              Create your account
            </h1>
            <p className="text-zinc-500 text-sm mt-1 mb-7">
              Join us today — it only takes a minute.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Text fields */}
              {fields.map(({ name, label, type, placeholder, auto }) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
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
                    <p className="text-rose-400 text-xs mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={show.password ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    autoComplete="new-password"
                    className={`${inputCls("password")} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShow((s) => ({ ...s, password: !s.password }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-400 transition-colors"
                  >
                    {show.password ? (
                      <FaEyeSlash size={14} />
                    ) : (
                      <FaEye size={14} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-rose-400 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-400 transition-colors"
                  >
                    {show.confirm ? (
                      <FaEyeSlash size={14} />
                    ) : (
                      <FaEye size={14} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-rose-400 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSigningUp}
                className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed
                           text-zinc-900 font-bold py-2.5 rounded-lg text-sm transition-all duration-150
                           active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
              >
                {isSigningUp ? (
                  <>
                    <span className="w-4 h-4 border-2 border-zinc-700 border-t-zinc-900 rounded-full animate-spin" />
                    Creating account…
                  </>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-zinc-800" />
              <span className="text-zinc-600 text-xs">or</span>
              <div className="flex-1 h-px bg-zinc-800" />
            </div>

            {/* Login link */}
            <p className="text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-amber-400 font-semibold hover:text-amber-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-5">
          By continuing you agree to our{" "}
          <span className="text-zinc-500 hover:text-amber-400 cursor-pointer transition-colors">
            Terms
          </span>{" "}
          &{" "}
          <span className="text-zinc-500 hover:text-amber-400 cursor-pointer transition-colors">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default Signup;
