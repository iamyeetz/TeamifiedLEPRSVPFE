import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="bg-gray-200 min-h-[600px] h-auto min-w-[300px] max-w-7xl p-5 rounded-xl">
      <div>
        <h1 className="text-xl font-bold text-center mb-2">Access Denied</h1>
        <p className="text-center text-sm text-gray-600">
          Hey there! You need to{" "}
          <Link to="/login">
            <span className="text-red-600">[ log in ]</span>
          </Link>{" "}
          to view this page.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
