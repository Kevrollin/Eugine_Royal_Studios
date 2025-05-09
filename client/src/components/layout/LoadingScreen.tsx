import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-primary z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <svg className="w-20 h-20 mx-auto" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#D4AF37" 
              strokeWidth="2"
              strokeDasharray="283" 
              strokeDashoffset="283"
              style={{
                animation: "drawCircle 2s forwards"
              }}
            />
            <text 
              x="50" 
              y="55" 
              textAnchor="middle" 
              fontFamily="Playfair Display" 
              fontSize="12" 
              fill="#D4AF37"
              style={{
                opacity: 0,
                animation: "fadeInText 1s forwards 1s"
              }}
            >
              ERS
            </text>
          </svg>
        </motion.div>
        <motion.h2 
          className="font-playfair text-2xl text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Eugine Ray Studios
        </motion.h2>
        <motion.p 
          className="text-neutral mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          presents
        </motion.p>
      </div>

      <style jsx>{`
        @keyframes drawCircle {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fadeInText {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
