import React from 'react';

type Props = {
  color?: string;
};

const CarTopIcon: React.FC<Props> = ({ color = '#FFD84D' }) => {
  return (
    <svg
      viewBox="0 0 200 100"
      width={50}
      height={25}
      fill="none"
      stroke="currentColor"
      style={{ color }}
      strokeWidth={8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Car top icon"
    >
      <rect x="6" y="12" width="188" height="76" rx="36" ry="36" />
      <rect x="18" y="26" width="22" height="48" rx="8" />
      <rect x="160" y="26" width="22" height="48" rx="8" />
      <rect x="70" y="24" width="60" height="52" rx="10" />
    </svg>
  );
};

export default CarTopIcon;
