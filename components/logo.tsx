"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon" | "text";
  size?: "sm" | "md" | "lg";
  className?: string;
  showAnimation?: boolean;
}

export function Logo({ variant = "full", size = "md", className, showAnimation = true }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-2xl" },
    lg: { icon: 48, text: "text-4xl" },
  };

  const currentSize = sizes[size];

  // Icon only version - Location pin with airplane
  if (variant === "icon") {
    return (
      <div
        className={cn(
          "relative inline-flex items-center justify-center",
          showAnimation && "transition-transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(53,181,174,0.5)]",
          className
        )}
      >
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#35B5AE" />
              <stop offset="100%" stopColor="#1B5363" />
            </linearGradient>
          </defs>

          {/* Location pin shape */}
          <path
            d="M24 4C16.268 4 10 10.268 10 18C10 28.5 24 44 24 44C24 44 38 28.5 38 18C38 10.268 31.732 4 24 4Z"
            fill="url(#logoGradient)"
          />

          {/* Inner circle for airplane */}
          <circle cx="24" cy="18" r="8" fill="white" />

          {/* Airplane icon */}
          <path
            d="M24 12L26.5 16.5H28L26 18.5L27 21L24 19L21 21L22 18.5L20 16.5H21.5L24 12Z"
            fill="url(#logoGradient)"
          />
        </svg>
      </div>
    );
  }

  // Text only version
  if (variant === "text") {
    return (
      <div
        className={cn(
          "inline-flex flex-col items-center",
          showAnimation && "transition-all hover:scale-105",
          className
        )}
      >
        <span
          className={cn(
            "font-bold leading-none bg-gradient-to-r from-[#35B5AE] to-[#1B5363] bg-clip-text text-transparent",
            currentSize.text
          )}
          style={{ fontFamily: "Pretendard, sans-serif" }}
        >
          트래비
        </span>
        <span
          className="text-xs font-medium text-muted-foreground mt-0.5"
          style={{ fontFamily: "Pretendard, sans-serif" }}
        >
          Travi
        </span>
      </div>
    );
  }

  // Full version - Icon + Text
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2",
        showAnimation && "group transition-all hover:scale-105",
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "relative flex-shrink-0",
          showAnimation &&
            "transition-transform group-hover:rotate-6 group-hover:drop-shadow-[0_0_8px_rgba(53,181,174,0.5)]"
        )}
      >
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGradientFull" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#35B5AE" />
              <stop offset="100%" stopColor="#1B5363" />
            </linearGradient>
          </defs>

          {/* Location pin shape */}
          <path
            d="M24 4C16.268 4 10 10.268 10 18C10 28.5 24 44 24 44C24 44 38 28.5 38 18C38 10.268 31.732 4 24 4Z"
            fill="url(#logoGradientFull)"
          />

          {/* Inner circle for airplane */}
          <circle cx="24" cy="18" r="8" fill="white" />

          {/* Airplane icon */}
          <path
            d="M24 12L26.5 16.5H28L26 18.5L27 21L24 19L21 21L22 18.5L20 16.5H21.5L24 12Z"
            fill="url(#logoGradientFull)"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-bold leading-none bg-gradient-to-r from-[#35B5AE] to-[#1B5363] bg-clip-text text-transparent",
            currentSize.text
          )}
          style={{ fontFamily: "Pretendard, sans-serif" }}
        >
          트래비
        </span>
      </div>
    </div>
  );
}

// Responsive logo component for header
export function ResponsiveLogo({ className }: { className?: string }) {
  return (
    <>
      {/* Desktop: Full logo */}
      <div className={cn("hidden md:block", className)}>
        <Logo variant="full" size="md" />
      </div>

      {/* Mobile: Icon only */}
      <div className={cn("block md:hidden", className)}>
        <Logo variant="icon" size="sm" />
      </div>
    </>
  );
}
