import { useState } from "react";
import {Link} from 'react-router-dom'
const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState<string>("");

  return (
    <div className="bg-gray-100 w-xl h-full text-black p-15 flex flex-col items-center gap-5 justify-around rounded-2xl">
      <h2 className="text-3xl">Event Planner</h2>
      <input
        onChange={(e) => setUsername(e.target.value)}
        className="rounded-md border-2 border-gray-300 bg-white w-sm p-3 "
        placeholder="Username"
        type="text"
      />
      <button
        onClick={() => handleLogin(username)}
        className="bg-white border-2 text-black w-xs rounded-md border-gray-300 py-2"
      >
        Login
      </button>
      <Link className="w-30 p-2 text-xs font-semibold text-gray-600  hover:text-gray-900" to="/">View Public Events</Link>
    </div>
  );
};

export default Login;
