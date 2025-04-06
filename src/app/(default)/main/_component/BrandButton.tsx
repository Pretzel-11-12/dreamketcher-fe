import Link from 'next/link';
import { ReactNode } from 'react';

interface BrandButtonProps {
  width: number;
  height: number;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}

const BrandButton = ({
  width,
  height,
  children,
  href,
  onClick,
}: BrandButtonProps) => {
  const buttonStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const commonClassName =
    'flex items-center justify-center bg-brand-yellow text-white rounded-[5px] text-[14px] font-medium border border-buttonLine';

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

export default BrandButton;
