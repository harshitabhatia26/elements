import React from 'react';
import { cva } from 'cva';

const variant = cva('animate-spin', {
  variants: {
    size: {
      xs: 'h-5 w-5',
      sm: 'h-8 w-8',
    },
    type: {
      primary: 'text-blue-500',
      secondary: 'text-gray-500',
    },
  },
});

export function Spinner({ variant: { size, type } }: any) {
  return (
    <svg fill="none" className={variant({ size, type })} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-20" />
      <path
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

/*
TODO
sizes
types
 */
