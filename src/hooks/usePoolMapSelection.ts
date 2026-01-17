import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";

interface SelectionData {
  x: number;
  y: number;
  sector: string | null;
}

interface SavedLocation extends SelectionData {
  timestamp: number;
}

// Point in polygon algorithm (Ray casting)
function isPointInPolygon(x: number, y: number, polygon: SVGPolygonElement): boolean {
  const points = polygon.points;
  const n = points.numberOfItems;
  if (n === 0) return false;
  
  let inside = false;

  let p1x = points.getItem(0).x;
  let p1y = points.getItem(0).y;

  for (let i = 1; i <= n; i++) {
    const p2x = points.getItem(i % n).x;
    const p2y = points.getItem(i % n).y;

    if (y > Math.min(p1y, p2y)) {
      if (y <= Math.max(p1y, p2y)) {
        if (x <= Math.max(p1x, p2x)) {
          const xIntersect = ((y - p1y) * (p2x - p1x)) / (p2y - p1y) + p1x;
          if (p1x === p2x || x <= xIntersect) {
            inside = !inside;
          }
        }
      }
    }

    p1x = p2x;
    p1y = p2y;
  }

  return inside;
}

// Check if point is inside a rect element
function isPointInRect(x: number, y: number, rect: SVGRectElement): boolean {
  const rx = parseFloat(rect.getAttribute("x") || "0");
  const ry = parseFloat(rect.getAttribute("y") || "0");
  const width = parseFloat(rect.getAttribute("width") || "0");
  const height = parseFloat(rect.getAttribute("height") || "0");
  
  return x >= rx && x <= rx + width && y >= ry && y <= ry + height;
}

// Check if point is inside a path element (simplified bounding box check)
function isPointInPath(x: number, y: number, path: SVGPathElement, svg: SVGSVGElement): boolean {
  try {
    const point = svg.createSVGPoint();
    point.x = x;
    point.y = y;
    return path.isPointInFill(point);
  } catch {
    // Fallback to bounding box
    const bbox = path.getBBox();
    return x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height;
  }
}

export function usePoolMapSelection() {
  const [selection, setSelection] = useState<SelectionData | null>(null);
  const [savedLocation, setSavedLocation] = useState<SavedLocation | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSvgClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const svg = container.querySelector("svg");
    if (!svg) return;

    // Get click position relative to SVG
    const rect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    
    // Calculate SVG coordinates
    const scaleX = viewBox.width / rect.width;
    const scaleY = viewBox.height / rect.height;
    
    const svgX = (e.clientX - rect.left) * scaleX;
    const svgY = (e.clientY - rect.top) * scaleY;

    // Find all green zones (st8 class elements)
    const greenZones = svg.querySelectorAll(".st8");
    let clickedInGreenZone = false;
    let sectorIndex = 0;

    for (const zone of greenZones) {
      sectorIndex++;
      
      if (zone instanceof SVGPolygonElement) {
        if (isPointInPolygon(svgX, svgY, zone)) {
          clickedInGreenZone = true;
          break;
        }
      } else if (zone instanceof SVGRectElement) {
        if (isPointInRect(svgX, svgY, zone)) {
          clickedInGreenZone = true;
          break;
        }
      } else if (zone instanceof SVGPathElement) {
        if (isPointInPath(svgX, svgY, zone, svg)) {
          clickedInGreenZone = true;
          break;
        }
      }
    }

    if (clickedInGreenZone) {
      // Valid selection
      setSelection({
        x: svgX,
        y: svgY,
        sector: `Setor ${String.fromCharCode(64 + sectorIndex)}`, // A, B, C, etc.
      });
    } else {
      // Invalid selection
      toast.error("Selecione apenas dentro da área verde (mesas da piscina).", {
        duration: 3000,
      });
    }
  }, []);

  const confirmSelection = useCallback(() => {
    if (!selection) return;

    const locationData: SavedLocation = {
      ...selection,
      timestamp: Date.now(),
    };

    // Save to localStorage
    localStorage.setItem("poolTableSelection", JSON.stringify(locationData));
    setSavedLocation(locationData);
    setIsConfirmed(true);
  }, [selection]);

  const clearSelection = useCallback(() => {
    setSelection(null);
  }, []);

  const resetAll = useCallback(() => {
    setSelection(null);
    setSavedLocation(null);
    setIsConfirmed(false);
    localStorage.removeItem("poolTableSelection");
  }, []);

  // Calculate pin position for display (needs to be in screen coordinates)
  const getPinScreenPosition = useCallback(() => {
    if (!selection || !containerRef.current) return null;

    const svg = containerRef.current.querySelector("svg");
    if (!svg) return null;

    const rect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;

    const scaleX = rect.width / viewBox.width;
    const scaleY = rect.height / viewBox.height;

    return {
      x: selection.x * scaleX,
      y: selection.y * scaleY,
    };
  }, [selection]);

  return {
    containerRef,
    selection,
    savedLocation,
    isConfirmed,
    handleSvgClick,
    confirmSelection,
    clearSelection,
    resetAll,
    getPinScreenPosition,
  };
}
