import React from 'react';
import { cn } from "@/lib/utils";

const Button = React.forwardRef(({ className, variant = "primary", size = "md", ...props }, ref) => {
  const variants = {
    primary: "bg-orange-600 text-white hover:bg-red-700 shadow-[0_0_15px_rgba(235,99,37,0.4)]",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/10",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5 border border-white/10",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base font-medium",
    lg: "px-8 py-3.5 text-lg font-semibold"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
