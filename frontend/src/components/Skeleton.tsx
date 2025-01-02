import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = '4px',
  className = '',
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export default Skeleton;
