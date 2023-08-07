import { formatCount } from '@elements/_utils';
import { cva } from 'cva';
import React, { memo, MouseEventHandler, useCallback } from 'react';

const containerVariant = cva('relative flex items-center justify-center rounded-md', {
  variants: {
    kind: {
      primary: 'bg-blue-600 text-white shadow-md',
      secondary: 'bg-white text-blue-700 border border-blue-500 shadow',
      tertiary: 'bg-white text-gray-700 border border-gray-300 shadow',
      success: 'bg-green-600 text-white shadow-md',
      danger: 'bg-red-600 text-white shadow-md',
      warning: 'text-amber-700 border border-amber-500 bg-amber-50 shadow',
    },
    size: {
      xxs: 'text-xs gap-1.5 px-1.5 h-[28px] font-normal shadow-sm',
      xs: 'text-xs gap-1.5 px-2.5 h-[32px] font-medium',
      sm: 'text-sm gap-2.5 px-3 h-[36px] font-medium',
      md: 'text-base gap-3 px-4 h-[40px] font-medium',
    },
    disabled: {
      false: 'cursor-pointer ease-out hover:translate-y-[0.5px] hover:shadow-none transition-all',
      true: 'cursor-default bg-gray-100 text-gray-400 shadow-none',
    },
    clicked: { true: '' },
    hasIcon: { true: '' },
  },
  defaultVariants: {
    kind: 'primary',
    size: 'sm',
  },
  compoundVariants: [
    { size: 'xs', hasIcon: true, class: 'pl-2 pr-2.5 shadow-sm' },
    { size: 'sm', hasIcon: true, class: 'pl-2.5 pr-3 shadow-sm' },
    { size: 'md', hasIcon: true, class: 'pl-3 pr-4' },
    {
      kind: 'tertiary',
      clicked: true,
      class: 'bg-gray-50 translate-y-[0.5px] shadow-none',
    },
  ],
});

const iconVariant = cva('', {
  variants: {
    kind: {
      primary: 'text-white',
      secondary: 'text-blue-600',
      tertiary: 'text-gray-500',
      warning: 'text-amber-700',
      success: 'text-white',
      danger: 'text-white',
    },
    size: {
      xxs: 'h-4 w-4',
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
      md: 'h-5 w-5',
    },
  },
});

const countVariant = cva('font-medium', {
  variants: {
    kind: {
      primary: 'text-white',
      secondary: 'text-blue-600',
      tertiary: 'text-gray-400',
      warning: 'text-amber-600',
      success: 'text-white',
      danger: 'text-white',
    },
    size: {
      xxs: 'text-xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
    },
  },
});

type Size = 'xxs' | 'xs' | 'sm' | 'md';

type Kind = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';

export interface ButtonProps {
  size: Size;
  value: string;
  count?: number;
  clicked?: boolean;
  Icon?: React.ComponentType<any>;
  iconClassName?: string;
  containerClassName?: string;
  type?: 'button' | 'submit';
  kind: Kind;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = memo(
  ({
    value,
    count,
    type = 'button',
    Icon,
    iconClassName,
    containerClassName,
    size,
    kind,
    disabled,
    clicked,
    onClick,
    ...props
  }: ButtonProps) => {
    const onClickMemo = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClick && !disabled && onClick(e);
      },
      [onClick, disabled]
    );

    return (
      <button
        {...props}
        className={containerVariant({
          size,
          kind,
          disabled: !!disabled,
          hasIcon: !!Icon,
          clicked: !!clicked,
          className: containerClassName,
        })}
        type={type === 'submit' ? 'submit' : 'button'}
        onClick={onClickMemo}>
        {!!Icon && <Icon className={iconVariant({ size, kind, className: iconClassName })} />}
        <span>{value}</span>
        {!!count && <span className={countVariant({ size, kind })}>{formatCount(count)}</span>}
      </button>
    );
  }
);
