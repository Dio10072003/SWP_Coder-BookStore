"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const HistoryCategory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700 flex items-center justify-center p-6">
      <motion.div
        className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CategoryHeader categoryName="History" Icon={Clock} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300">History book listing placeholder</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HistoryCategory;