"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';

const FantasyCategory = () => {
  return (
    <div className="p-6 bg-white min-h-screen text-gray-900">
      <motion.h1
        className="text-3xl font-bold mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <Wand2 className="h-8 w-8 text-blue-600" />
        Fantasy Books
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-gray-800">Book listing placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default FantasyCategory;