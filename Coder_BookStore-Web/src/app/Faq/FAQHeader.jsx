import React from "react";

const FAQHeader = () => (
  <header className="relative flex flex-col items-center justify-center py-14 md:py-20 bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 overflow-hidden rounded-b-3xl shadow-xl mb-10 animate-gradient-move">
    <span className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/70 shadow-2xl mb-4 animate-float">
      <svg
        width="56"
        height="56"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-pink-600 w-14 h-14 md:w-20 md:h-20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </span>
    <h1 className="text-3xl md:text-5xl font-extrabold text-blue-800 drop-shadow-lg text-center mb-2">
      Câu Hỏi Thường Gặp (FAQ)
    </h1>
    <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl font-medium mb-2">
      Giải đáp mọi thắc mắc về mua sách, vận chuyển, đổi trả, bảo mật và dịch vụ
      tại <span className="text-pink-600 font-semibold">Coder-BookStore</span>.
    </p>
    <span className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 opacity-30 rounded-full blur-2xl animate-blob z-0" />
    <span className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-200 opacity-20 rounded-full blur-2xl animate-blob2 z-0" />
  </header>
);

export default FAQHeader;
/*
import React from 'react';

const FAQHeader = ({
  title = "Câu Hỏi Thường Gặp (FAQ)",
  description = "Giải đáp mọi thắc mắc về mua sách, vận chuyển, đổi trả, bảo mật và dịch vụ tại",
  brand = "Coder-BookStore",
}) => (
  <header
    role="banner"
    className="relative flex flex-col items-center justify-center py-14 md:py-20 bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 overflow-hidden rounded-b-3xl shadow-xl mb-10 animate-gradient-move"
  >
    <span className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/70 shadow-2xl mb-4 animate-float">
      <svg
        width="56"
        height="56"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-pink-600 w-14 h-14 md:w-20 md:h-20"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </span>

    <h1 className="text-3xl md:text-5xl font-extrabold text-blue-800 drop-shadow-lg text-center mb-2">
      {title}
    </h1>

    <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl font-medium mb-2">
      {description}{' '}
      <span className="text-pink-600 font-semibold">{brand}</span>.
    </p>

    {/* Decorative blobs *
    <span className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 opacity-30 rounded-full blur-2xl animate-blob z-0" />
    <span className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-200 opacity-20 rounded-full blur-2xl animate-blob2 z-0" />
  </header>
);

export default FAQHeader;

*/
