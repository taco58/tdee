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

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-white/50", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
