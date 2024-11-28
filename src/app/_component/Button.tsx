"use client";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: "XL" | "L" | "M" | "S" | "XS";
  variant: "bg-blue" | "bg-gray" | "bg-transparent";
  disabled?: boolean;
  containerStyles?: string;
  children: React.ReactNode;
}
const SIZE_MAP: { [k in Props["size"]]: string } = {
  XL: "w-[360px] rounded-xl py-3 px-5 text-xl",
  L: "w-[180px] rounded-xl py-3 px-5 text-lg",
  M: "w-fit rounded-lg py-2 px-4 text-base",
  S: "w-fit rounded-lg py-2 px-3 text-sm",
  XS: "w-fit rounded-md py-2 px-3 text-xs",
};
const VARIANT_MAP: { [k in Props["variant"]]: string } = {
  "bg-gray":
    "bg-gray-500 text-white hover:bg-gray-400 disabled:bg-gray-300 disabled:cursor-not-allowed",
  "bg-blue":
    "bg-blue-500 text-white hover:bg-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed",
  "bg-transparent":
    "text-gray-500 hover:text-gray-900 disabled:cursor-not-allowed",
};

export default function Button({
  size = "S",
  variant = "bg-blue",
  disabled,
  children,
  containerStyles,
  ...rest
}: Props) {
  return (
    <button
      className={`${SIZE_MAP[size]} ${VARIANT_MAP[variant]} ${containerStyles}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
