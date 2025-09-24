import React from "react";
import { motion } from "framer-motion";

const ImageScroller = ({ images, speed = "15s" }) => {
  return (
    <div className="overflow-hidden w-full py-8">
      {/* Top row (scrolls left) */}
      <motion.div
        className="flex gap-6 mb-10"
        animate={{
          x: [0, -1920]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: parseInt(speed),
            ease: "linear"
          }
        }}
        style={{ width: "200%" }}
      >
        {[...images, ...images, ...images, ...images].map((img, index) => (
          <motion.div
            key={`top-${index}`}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="flex-shrink-0"
          >
            <img
              src={img}
              alt={`Recipe ${index + 1}`}
              className="w-48 h-48 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom row (scrolls right) */}
      <motion.div
        className="flex gap-6"
        animate={{
          x: [-1920, 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: parseInt(speed),
            ease: "linear"
          }
        }}
        style={{ width: "200%" }}
      >
        {[...images, ...images, ...images, ...images].map((img, index) => (
          <motion.div
            key={`bottom-${index}`}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="flex-shrink-0"
          >
            <img
              src={img}
              alt={`Recipe ${index + 1}`}
              className="w-48 h-48 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageScroller;