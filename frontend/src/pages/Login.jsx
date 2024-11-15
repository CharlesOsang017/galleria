import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!res.ok) {
        // Create a custom error based on the server response
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }
  
      return res.json();
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({queryKey: ['authUser']})
    },
    onError: async (error) => {
      toast.error(error.message);
    },
  });
  

  const handleLogin = ()=>{
    mutate(formData)
  }
  return (
    <div className="flex flex-col items-center justify-center px-3 space-y-2 py-8">
      <h2 className="text-extrabold text-3xl">Welcome Back!</h2>
      <label className="input input-bordered flex items-center gap-2 w-full max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="email"
          className="grow"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </label>
      <button onClick={handleLogin} className="btn w-full max-w-md btn-base-300">Login</button>
      <small className="text-sm">
        Don't Have an Account?{" "}
        <Link to={"/register"} className="text-blue-600 underline">
          Register
        </Link>
      </small>
    </div>
  );
};

export default Login;
