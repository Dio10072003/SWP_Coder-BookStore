"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const RomanceCategory = () => {
  return (
    <div className="p-6 bg-gray-800 min-h-screen text-gray-200">
      <motion.h1
        className="text-3xl font-bold mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <Heart className="h-8 w-8 text-cyan-400" />
        Romance Books
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-300">Book listing placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default RomanceCategory;