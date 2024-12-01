"use client";

export default function LoadingDots() {
  return (
    <div className="flex space-x-1 items-center justify-center">
      <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
      <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
      <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
    </div>
  );
}