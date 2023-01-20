import React from 'react';
import { cva, VariantProps } from 'cva';
import { formatCount } from '@elements/_utils';

const variant = cva('w-max h-max flex font-medium justify-center w-max items-center rounded-md', {
  variants: {
    kind: {
      primary: 'bg-blue-600 text-white',
      tertiary: 'bg-white text-gray-700 border border-gray-300',
    },
    size: {
      xs: 'text-xs gap-2 px-2.5 py-2 shadow-sm',
      sm: 'text-sm gap-3 px-4 py-2.5 shadow-md',
    },
    disabled: {
      false: 'cursor-pointer ease-out hover:translate-y-[0.5px] hover:shadow-none transition-all',
      true: 'cursor-default bg-gray-100 text-gray-400 shadow-none',
    },
  },
  defaultVariants: {
    kind: 'primary',
    size: 'sm',
  },
});

const iconVariant = cva('', {
  variants: {
    kind: {
      primary: 'text-white',
      tertiary: 'text-gray-500',
    },
    size: {
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
    },
  },
});

const countVariant = cva('font-medium', {
  variants: {
    kind: {
      primary: 'text-white',
      tertiary: 'text-gray-400',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
    },
  },
});

type Variant = VariantProps<typeof variant>;

export interface IButton
  extends React.ComponentPropsWithoutRef<'button'>,
    Omit<Variant, 'disabled'> {
  value: string;
  count?: number;
  Icon?: React.ComponentType<any>;
}

export const Button = ({ value, count, Icon, size, kind, disabled, ...props }: IButton) => {
  return (
    <button {...props} className={variant({ size, kind, disabled: !!disabled })}>
      {Icon && <Icon className={iconVariant({ size, kind })} />}
      <span>{value}</span>
      {count && <span className={countVariant({ size, kind })}>{formatCount(count)}</span>}
    </button>
  );
};
