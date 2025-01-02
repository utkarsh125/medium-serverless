import { Link, useNavigate } from "react-router-dom";
import { SigninInput, SignupInput } from "@utkarsh125/blog-common";

import { BACKEND_URL } from "../config";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { useState } from "react";

interface AuthProps {
  type: "signin" | "signup";
}

interface AuthResponse {
  token: string;
}

export const Auth: React.FC<AuthProps> = ({ type }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SigninInput | SignupInput>(
    type === "signin"
      ? { username: "", password: "" }
      : { username: "", password: "", name: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = `/api/v1/user/${type}`;
      const response = await axios.post(`${BACKEND_URL}${endpoint}`, formData);
      const token = (response.data as AuthResponse).token;
      console.log(token);
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/blogs");
    } catch (error) {
      alert("Check your credentials");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side with gradient */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-purple-500 to-purple-900 p-12 flex-col justify-between">
        <div className="text-white text-2xl font-bold font-lora">slothblog.</div>
        <div className="text-white font-roboto text-5xl font-bold leading-tight">
          Welcome to the era
          <br />
          of lazy knowledge 🤖
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full md:w-1/2 flex font-roboto items-center justify-center bg-black p-8">
        <div className="w-full max-w-md">
          {/* <h2 className="text-2xl font-semibold text-white mb-2">
            Sign Up For Free.
          </h2>
          <p className="text-gray-400 mb-8">
            Let's sign you up quickly to get started.
          </p> */}

          {type === "signin" ? (
            <>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Welcome Back!
              </h2>
              <p className="text-gray-400 mb-8">
                Let's sign you back in to continue.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Sign Up For Free.
              </h2>
              <p className="text-gray-400 mb-8">
                Let's sign you up quickly to get started.
              </p>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "signup" && (
              <LabelledInput
                label="Username"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
              />
            )}
            <LabelledInput
              label="Email Address"
              name="username"
              placeholder="example@mail.com"
              onChange={handleChange}
            />
            <LabelledInput
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••••••••"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full py-3 mt-6 flex justify-center items-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              disabled={loading}
            >
              {loading ? (
                <Oval height={20} strokeWidth={5} color="#fff" />
              ) : type === "signin" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="text-center text-gray-400 mt-4">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="text-indigo-500 hover:text-indigo-400"
              >
                {type === "signin" ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput: React.FC<LabelledInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  onChange,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-300 mb-2"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
    />
  </div>
);

export default Auth;
