import React from "react";
import clsx from "clsx";
import { useLocale } from "next-intl";

interface IButtonProps {
  text: string;
  icon?: React.ReactNode;
  color?: "primary" | "secondary" | "third";
  textColor?: "primary" | "secondary" | "third" | "background" | "foreground";
  outline?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({ 
  text, 
  icon, 
  color = "primary", 
  textColor, 
  outline = false, 
  className, 
  onClick 
}) => {
  const locale = useLocale();
  const isRTL = locale === "fa";

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
      {isRTL ? (
        <>
          <span>{text}</span>
          {icon && <span>{icon}</span>}
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span>{text}</span>
        </>
      )}
    </button>
  );
};

export default Button;
