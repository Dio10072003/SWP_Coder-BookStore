

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const HistoryCategory = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full text-gray-900"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Clock className="h-8 w-8 text-blue-600" />
          History Books
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-gray-800">History book listing placeholder</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HistoryCategory;