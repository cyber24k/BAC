import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0 to 100
  type?: 'linear' | 'circle';
  size?: number; // for circle only (width/height in px)
  strokeWidth?: number; // for circle only
  label?: string;
  showPercent?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  type = 'linear',
  size = 120,
  strokeWidth = 10,
  label,
  showPercent = true,
}) => {
  const percentage = Math.min(Math.max(value, 0), 100);

  if (type === 'circle') {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative" style={{ width: size, height: size }}>
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-stone-200"
              strokeWidth={strokeWidth}
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx={size / 2}
              cy={size / 2}
            />
            {/* Animated foreground circle */}
            <motion.circle
              className="text-church-gold"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx={size / 2}
              cy={size / 2}
            />
          </svg>
          {/* Percentage label overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            {showPercent && (
              <span className="text-2xl font-bold font-serif text-church-purple">
                {percentage}%
              </span>
            )}
            {label && <span className="text-xs text-stone-500 font-medium px-2">{label}</span>}
          </div>
        </div>
      </div>
    );
  }

  // Linear progress bar
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1 text-sm">
        {label && <span className="font-semibold text-stone-700">{label}</span>}
        {showPercent && (
          <span className="font-bold text-church-purple">{percentage}%</span>
        )}
      </div>
      <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-church-purple to-church-gold h-full rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
