import React from "react";
import {
  FaClipboardList,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const statusIcons = {
  ordered: <FaClipboardList />,
  processing: <FaBoxOpen />,
  shipping: <FaTruck />,
  delivered: <FaCheckCircle />,
};

const statusColors = {
  ordered: "bg-blue-200 text-blue-700",
  processing: "bg-yellow-200 text-yellow-700",
  shipping: "bg-purple-200 text-purple-700",
  delivered: "bg-green-200 text-green-700",
};

export default function OrderTimeline({ trackings }) {
  return (
    <ol className="relative border-l-4 border-cyan-200 ml-4">
      {trackings.map((t, idx) => (
        <li key={t.id} className="mb-8 ml-6">
          <span
            className={`absolute -left-7 flex items-center justify-center w-10 h-10 rounded-full ring-4 ring-white ${
              statusColors[t.status] || "bg-cyan-100 text-cyan-700"
            }`}
          >
            <span className="text-2xl">
              {statusIcons[t.status] || <FaClipboardList />}
            </span>
          </span>
          <h3 className="flex items-center mb-1 text-lg font-semibold">
            {(t.status || "").toUpperCase()}{" "}
            <span className="ml-2 text-xs text-gray-400">
              {new Date(t.updated_at).toLocaleString()}
            </span>
          </h3>
          <p className="mb-2 text-gray-600">{t.location}</p>
          <p className="text-sm text-gray-400">{t.note}</p>
        </li>
      ))}
    </ol>
  );
}
/*
import React from 'react';
import { FaClipboardList, FaBoxOpen, FaTruck, FaCheckCircle } from 'react-icons/fa';

const statusIcons = {
  ordered: <FaClipboardList />,
  processing: <FaBoxOpen />,
  shipping: <FaTruck />,
  delivered: <FaCheckCircle />,
};

const statusColors = {
  ordered: 'bg-blue-200 text-blue-700',
  processing: 'bg-yellow-200 text-yellow-700',
  shipping: 'bg-purple-200 text-purple-700',
  delivered: 'bg-green-200 text-green-700',
};

export default function OrderTimeline({ trackings }) {
  return (
    <ol className="relative border-l-4 border-cyan-200 ml-4">
      {trackings.map((t, idx) => (
        <li key={t.id} className="mb-8 ml-6">
          <span className={`absolute -left-7 flex items-center justify-center w-10 h-10 rounded-full ring-4 ring-white ${statusColors[t.status] || 'bg-cyan-100 text-cyan-700'}`}> 
            <span className="text-2xl">{statusIcons[t.status] || <FaClipboardList />}</span>
          </span>
          <h3 className="flex items-center mb-1 text-lg font-semibold">{(t.status || '').toUpperCase()} <span className="ml-2 text-xs text-gray-400">{new Date(t.updated_at).toLocaleString()}</span></h3>
          <p className="mb-2 text-gray-600">{t.location}</p>
          <p className="text-sm text-gray-400">{t.note}</p>
        </li>
      ))}
    </ol>
  );
} 
*/
