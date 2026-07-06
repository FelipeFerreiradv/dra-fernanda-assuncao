"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#0b0f19",
          color: "#f7f5f0",
          border: "1px solid rgba(201, 163, 107, 0.35)",
          borderRadius: "2px",
          fontFamily: "var(--font-inter)",
          fontSize: "0.875rem",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
