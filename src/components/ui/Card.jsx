import React from 'react';
import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, variant = "standard", ...props }, ref) => {
  const variants = {
    standard: "bg-[#111111] border border-white/5",
    glass: "bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl",
    outline: "bg-transparent border border-white/10"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl overflow-hidden",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Card.displayName = "Card";

export { Card };
