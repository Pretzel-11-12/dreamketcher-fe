import Link from 'next/link';
import { ReactNode } from 'react';

interface WhiteBrandButtonProps {
  width: number;
  height: number;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}

const WhiteBrandButton = ({
  width,
  height,
  children,
  href,
  onClick,
}: WhiteBrandButtonProps) => {
  const buttonStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const commonClassName =
    'flex items-center justify-center bg-[#FFEFE0] text-brand-yellow rounded-[5px] text-[14px] font-medium border border-[#FA973B]';

  if (href) {
    return (
      <Link href={href} className={commonClassName} style={buttonStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={commonClassName} style={buttonStyle}>
      {children}
    </button>
  );
};

export default WhiteBrandButton;
