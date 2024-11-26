"use client";

type CustomButtonProps = {
  title: string;
  handleClick: () => void;
  disabled?: boolean;
  containerStyles?: string;
  textStyles?: string;
  ghost?: boolean;

  // 필요한 Props 추가
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handleClick,
  disabled = false,
  containerStyles = "",
  textStyles = "",
  ghost = false,
}) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`custom-button ${containerStyles} ${ghost ? "ghost" : ""}`}
    >
      <span className={`custom-button-text ${textStyles}`}>{title}</span>
    </button>
  );
};

export default CustomButton;
