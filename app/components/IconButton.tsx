type IconButtonProps = {
  icon: React.ReactNode; // SVG component or element
  onClick?: () => void; // click handler
  size?: "sm" | "md" | "lg"; // optional size
  className?: string; // extra classes
  ariaLabel: string; // accessibility
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  size = "md",
  className = "",
  ariaLabel,
}) => {
  // Tailwind size mapping
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
