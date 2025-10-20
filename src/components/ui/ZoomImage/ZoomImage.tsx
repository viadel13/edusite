import React, { useRef, useState } from "react";
import Image from "next/image";
import { Paper } from "@mui/material";

export default function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("center");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <Paper
      elevation={0}
      ref={containerRef}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
      sx={{
        borderRadius: "2px",
        display: "flex",

        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        width: "100%",
        p: "20px",

        cursor: "zoom-in",
        transition: "all 0.3s ease",
      }}
    >
      {/* ✅ Image normale */}
      <Image
        alt={alt}
        src={src}
        width={5000}
        height={5000}
        style={{
          height: "auto",
          width: "100%",
          objectFit: "cover",
          border: "none",
          opacity: isZoomed ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
        draggable={false}
      />

      {/* ✅ Image zoomée en arrière-plan */}
      {isZoomed && (
        <div
          style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            backgroundPosition,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transition: "background-position 0.05s ease-out",
          }}
        ></div>
      )}
    </Paper>
  );
}
