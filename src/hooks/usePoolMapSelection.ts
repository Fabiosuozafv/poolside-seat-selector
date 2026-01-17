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

export function usePoolMapSelection() {
  const [selection, setSelection] = useState<SelectionData | null>(null);
  const [savedLocation, setSavedLocation] = useState<SavedLocation | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleSvgClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;

    // Get click position relative to SVG
    const rect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    
    // Calculate SVG coordinates
    const scaleX = viewBox.width / rect.width;
    const scaleY = viewBox.height / rect.height;
    
    const svgX = (e.clientX - rect.left) * scaleX;
    const svgY = (e.clientY - rect.top) * scaleY;

    // Find all green zones (st8 class polygons)
    const greenZones = svg.querySelectorAll(".st8");
    let clickedSector: string | null = null;

    for (const zone of greenZones) {
      if (zone instanceof SVGPolygonElement) {
        if (isPointInPolygon(svgX, svgY, zone)) {
          clickedSector = zone.getAttribute("data-sector");
          break;
        }
      }
    }

    if (clickedSector) {
      // Valid selection
      setSelection({
        x: svgX,
        y: svgY,
        sector: `Setor ${clickedSector}`,
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
    if (!selection || !svgRef.current) return null;

    const svg = svgRef.current;
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
    svgRef,
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
