import React from "react";
import clsx from "clsx";

interface IButtonProps {
  text: string;
  icon?: React.ReactNode;
  color?: "primary" | "secondary" | "third";
  textColor?: "primary" | "secondary" | "third" | "background" | "foreground";
  outline?: boolean;
  className?: string;
  onClick?: () => void;
  iconFirst?: boolean;
  iconSize?: "sm" | "md" | "lg" | "xl" | "twoXl" | "threeXl" | "fourXl";
}

const Button: React.FC<IButtonProps> = ({
  text,
  icon,
  color = "primary",
  textColor,
  outline = false,
  className,
  onClick,
  iconFirst = true,
  iconSize = "md",
}) => {

  const baseStyles =
    "flex items-center justify-center w-fit rounded-3xl gap-2 px-4 py-2 font-medium transition-all";

  const colors = {
    primary: outline
      ? "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white"
      : "bg-primary text-white hover:opacity-90",
    secondary: outline
      ? "border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white"
      : "bg-secondary text-white hover:opacity-90",
    third: outline
      ? "border border-third text-third bg-transparent hover:bg-third hover:text-white"
      : "bg-third text-white hover:opacity-90",
  };

  const iconSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    twoXl: "text-2xl", 
    threeXl: "text-3xl",
    fourXl: "text-4xl"
  };

  return (
    <button
      className={clsx(
        baseStyles,
        colors[color],
        textColor ? `text-${textColor}` : "",
        className,
      )}
      onClick={onClick}
    >
      {iconFirst && icon && <span className={iconSizes[iconSize]}>{icon}</span>}
      <span className={textColor ? `text-${textColor}` : ""}>{text}</span>
      {!iconFirst && icon && <span className={iconSizes[iconSize]}>{icon}</span>}
    </button>
  );
};

export default Button;
