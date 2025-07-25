import React from "react";

export default function OrderStep({
  icon,
  label,
  desc,
  active,
  color,
  isLast,
}) {
  return (
    <div className="flex flex-col items-center flex-1">
      <div
        className={`text-4xl mb-2 ${color} ${
          active ? "opacity-100" : "opacity-30"
        }`}
      >
        {icon}
      </div>
      <div
        className={`font-bold mb-1 ${
          active ? "text-cyan-700" : "text-gray-400"
        }`}
      >
        {label}
      </div>
      <div
        className={`text-sm text-center ${
          active ? "text-gray-600" : "text-gray-300"
        }`}
      >
        {desc}
      </div>
      {isLast ? null : (
        <div
          className={`hidden md:block h-12 w-1 mx-auto my-2 rounded-full ${
            active ? "bg-cyan-400" : "bg-gray-200"
          }`}
        ></div>
      )}
    </div>
  );
}
/*
import PropTypes from 'prop-types';

OrderStep.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  active: PropTypes.bool,
  color: PropTypes.string,
  isLast: PropTypes.bool,
};

*/
