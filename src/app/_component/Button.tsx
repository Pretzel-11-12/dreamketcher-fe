'use client';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'XL' | 'L' | 'M' | 'S' | 'XS' | 'C';
  variant:
    | 'brand-yellow'
    | 'brand-blue'
    | 'brand-gray'
    | 'brand-gray-light'
    | 'transparent'
    | 'brand-gray-light';
  disabled?: boolean;
  containerStyles?: string;
  border?: string;
  handleClick?: () => void;
}
const SIZE_MAP: { [k in Props['size']]: string } = {
  XL: 'w-full rounded-xl py-3 px-5 text-xl',
  L: 'w-full rounded-lg py-4 px-5 text-lg',
  M: 'w-full rounded-md py-2 px-4 text-md',
  S: 'w-full rounded-md py-2 px-3 text-sm font-medium',
  XS: 'w-full rounded-sm py-2 px-3 text-xs',
  C: 'w-full rounded-md py-[10px] px-3 text-sm font-medium',
};
const VARIANT_MAP: { [k in Props['variant']]: string } = {
  'brand-yellow':
    'bg-brand-yellow text-white hover:bg-[#FCB06A] disabled:bg-gray-300',
  'brand-blue':
    'bg-brand-blue text-white hover:bg-[#4D5D87] disabled:bg-gray-300',
  'brand-gray':
    'bg-brand-gray text-[#3F3F3F] hover:bg-[#efefef] disabled:bg-gray-300',
  'brand-gray-light':
    'bg-[#FBFBFB] text-[#545454] hover:bg-[#efefef] disabled:bg-gray-300 border border-[#F2F2F2]',
  transparent: 'text-bg-brand-gray',
};

type ButtonProps = {
  props: Props;
  children: ReactNode;
};

const Button: React.FC<ButtonProps> = ({ props, children }) => {
  const { size, variant, containerStyles, disabled, handleClick, ...rest } =
    props;
  return (
    <button
      onClick={handleClick}
      className={`${SIZE_MAP[size]} ${VARIANT_MAP[variant]} ${containerStyles}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
