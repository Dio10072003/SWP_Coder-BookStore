import React, { useEffect, useRef, useState } from "react";

const FAQCard = ({ question, answer, isOpen, onClick, color }) => {
  const [displayed, setDisplayed] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      let i = 0;
      setDisplayed("");
      intervalRef.current = setInterval(() => {
        setDisplayed((prev) => {
          if (i < answer.length) {
            i++;
            return answer.slice(0, i);
          } else {
            clearInterval(intervalRef.current);
            return answer;
          }
        });
      }, 15);
      return () => clearInterval(intervalRef.current);
    } else {
      setDisplayed("");
      clearInterval(intervalRef.current);
    }
  }, [isOpen, answer]);

  return (
    <div
      className={`relative rounded-2xl shadow-lg p-6 md:p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl animate-fade-in cursor-pointer ${
        color || "bg-white"
      }`}
    >
      <div className="flex items-center gap-3 mb-2" onClick={onClick}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 shadow-md mr-2 animate-float">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-pink-500 w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
        <h2 className="text-lg md:text-xl font-bold text-blue-800 drop-shadow flex-1 select-none">
          {question}
        </h2>
        <button
          className={`ml-2 w-8 h-8 flex items-center justify-center rounded-full border-2 border-blue-300 bg-white text-blue-700 font-bold text-xl transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-label={isOpen ? "Đóng" : "Mở"}
          onClick={onClick}
        >
          +
        </button>
      </div>
      {isOpen && (
        <div className="text-gray-700 text-base md:text-lg pl-12 mt-2 min-h-[2.5em] font-mono animate-typing">
          {displayed}
        </div>
      )}
    </div>
  );
};

export default FAQCard;
/*
import React, { useEffect, useRef, useState } from 'react';

const FAQCard = ({ question, answer, isOpen, onClick, color }) => {
  const [displayed, setDisplayed] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      let i = 0;
      setDisplayed('');
      intervalRef.current = setInterval(() => {
        setDisplayed(prev => {
          if (i < answer.length) {
            i++;
            return answer.slice(0, i);
          } else {
            clearInterval(intervalRef.current);
            return answer;
          }
        });
      }, 15);
    } else {
      setDisplayed('');
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isOpen, answer]);

  return (
    <div
      className={`relative rounded-2xl shadow-lg p-6 md:p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl animate-fade-in cursor-pointer ${
        color || 'bg-white'
      }`}
    >
      <div className="flex items-center gap-3 mb-2" onClick={onClick}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 shadow-md mr-2 animate-float">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-pink-500 w-7 h-7"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
        <h2 className="text-lg md:text-xl font-bold text-blue-800 drop-shadow flex-1 select-none">{question}</h2>
        <button
          className={`ml-2 w-8 h-8 flex items-center justify-center rounded-full border-2 border-blue-300 bg-white text-blue-700 font-bold text-xl transition-transform duration-200 ${
            isOpen ? 'rotate-45' : ''
          }`}
          aria-label={isOpen ? 'Đóng' : 'Mở'}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          +
        </button>
      </div>

      {isOpen && (
        <div className="text-gray-700 text-base md:text-lg pl-12 mt-2 min-h-[2.5em] font-mono animate-typing">
          {displayed}
        </div>
      )}
    </div>
  );
};

export default FAQCard;

*/
