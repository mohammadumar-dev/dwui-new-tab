"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = (props: ToasterProps) => {
  return (
    <Sonner
      theme="light" // you can change this later
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "rgba(255,255,255,0.2)",
          "--normal-text": "white",
          "--normal-border": "rgba(255,255,255,0.25)",
          "--border-radius": "1rem",
          backdropFilter: "blur(12px)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
