import { useEffect, useState } from "react";

interface PoolMapSVGProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PoolMapSVG = ({ onClick }: PoolMapSVGProps) => {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    // Fetch the original SVG file
    fetch("/piscina-mapa.svg")
      .then((res) => res.text())
      .then((text) => {
        // Remove XML declaration and add interactivity styles
        let modifiedSvg = text
          .replace(/<\?xml[^?]*\?>/g, "")
          .replace(/display:\s*none/g, "display:block"); // Show hidden elements if needed
        
        // Add cursor pointer to st8 elements
        modifiedSvg = modifiedSvg.replace(
          /\.st8\s*\{[^}]*\}/g,
          `.st8 {
            fill: #95c11f;
            cursor: pointer;
            transition: filter 0.2s ease;
          }
          .st8:hover {
            filter: brightness(1.15);
          }`
        );
        
        setSvgContent(modifiedSvg);
      });
  }, []);

  if (!svgContent) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div
      className="pool-svg-container w-full h-auto"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default PoolMapSVG;
