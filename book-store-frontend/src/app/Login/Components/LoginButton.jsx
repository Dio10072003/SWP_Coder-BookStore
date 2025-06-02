import React from "react";

const LoginButton = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full px-6 py-3 bg-yellow-400 text-indigo-900 font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300"
    >
      {text}
    </button>
  );
};

export default LoginButton;
