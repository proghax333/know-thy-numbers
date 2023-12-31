import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import env from "../secrets.js"

const { VITE_BACKEND_HOST } = env

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault()
    if(!(email && password)) alert("Invalid email or password")

    setEmail("")
    setPassword("")

    try {
      const url = `${VITE_BACKEND_HOST}/admin/login`
      let response = await axios({
        method: "post",
        url,
        data: { username: email, password },
        headers: { "Content-Type": "application/json" },
        // withCredentials: true
      })
  
      console.log(response)

      navigate("/home/table")
  
    } catch (err) {
      let response = err.response
      if(response.status === 404) {
        alert("No such account found")
        navigate("/signup")
      }
      else {
        alert("Invalid email/password")
        navigate("/login")
      }
      return
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Sign In
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/signup"
            >Don&apos;t have an account? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
