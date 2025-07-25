import React from "react";

export default function OrderSupport() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8 flex flex-col items-center gap-3">
      <div className="text-lg font-bold text-cyan-700">
        Cần hỗ trợ về đơn hàng?
      </div>
      <div>
        Hotline:{" "}
        <a href="tel:0901234567" className="text-blue-600 font-semibold">
          0901 234 567
        </a>
      </div>
      <div>
        Email:{" "}
        <a
          href="mailto:support@coderbookstore.com"
          className="text-blue-600 font-semibold"
        >
          support@coderbookstore.com
        </a>
      </div>
      <a href="/Faq" className="text-cyan-700 underline">
        Xem FAQ
      </a>
      <button className="mt-2 px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">
        Gửi yêu cầu hỗ trợ
      </button>
    </div>
  );
}
/*
import React from "react";

export default function OrderSupport() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8 flex flex-col items-center gap-3">
      <div className="text-lg font-bold text-cyan-700">
        Cần hỗ trợ về đơn hàng?
      </div>
      <div>
        Hotline:{" "}
        <a href="tel:0901234567" className="text-blue-600 font-semibold">
          0901 234 567
        </a>
      </div>
      <div>
        Email:{" "}
        <a
          href="mailto:support@coderbookstore.com"
          className="text-blue-600 font-semibold"
        >
          support@coderbookstore.com
        </a>
      </div>
      <a href="/Faq" className="text-cyan-700 underline">
        Xem FAQ
      </a>
      <button className="mt-2 px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">
        Gửi yêu cầu hỗ trợ
      </button>
    </div>
  );
}
/*

*/
