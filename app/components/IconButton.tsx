type IconButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel: string;
};

export const IconButton = ({
  icon,
  onClick,
  size = "md",
  className = "",
  ariaLabel,
}: IconButtonProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex items-center justify-center transition cursor-pointer ${sizeClasses[size]} ${className}`}
    >
      {icon}
    </button>
  );
};
