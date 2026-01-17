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

// Define green areas as polygons (coordinates relative to viewBox 0 0 489 537)
const greenAreas = [
  {
    sector: "A",
    // Left green area
    polygon: [
      { x: 0, y: 40 },
      { x: 85, y: 0 },
      { x: 85, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 480 },
      { x: 85, y: 480 },
      { x: 85, y: 537 },
      { x: 0, y: 500 },
    ],
  },
  {
    sector: "B", 
    // Right green area
    polygon: [
      { x: 400, y: 30 },
      { x: 489, y: 70 },
      { x: 489, y: 470 },
      { x: 400, y: 510 },
      { x: 400, y: 480 },
      { x: 385, y: 480 },
      { x: 385, y: 100 },
      { x: 400, y: 100 },
    ],
  },
];

// Point in polygon algorithm (Ray casting)
function isPointInPolygon(x: number, y: number, polygon: { x: number; y: number }[]): boolean {
  let inside = false;
  const n = polygon.length;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }

  return inside;
}

export function usePoolMapSelection() {
  const [selection, setSelection] = useState<SelectionData | null>(null);
  const [savedLocation, setSavedLocation] = useState<SavedLocation | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMapClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const img = container.querySelector("img");
    if (!img) return;

    // Get click position relative to image
    const rect = img.getBoundingClientRect();
    
    // Image natural dimensions mapped to viewBox
    const viewBoxWidth = 489;
    const viewBoxHeight = 537;
    
    // Calculate coordinates in viewBox space
    const scaleX = viewBoxWidth / rect.width;
    const scaleY = viewBoxHeight / rect.height;
    
    const mapX = (e.clientX - rect.left) * scaleX;
    const mapY = (e.clientY - rect.top) * scaleY;

    // Check if click is in any green area
    let clickedSector: string | null = null;

    for (const area of greenAreas) {
      if (isPointInPolygon(mapX, mapY, area.polygon)) {
        clickedSector = area.sector;
        break;
      }
    }

    if (clickedSector) {
      // Valid selection
      setSelection({
        x: mapX,
        y: mapY,
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
    if (!selection || !containerRef.current) return null;

    const img = containerRef.current.querySelector("img");
    if (!img) return null;

    const rect = img.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const viewBoxWidth = 489;
    const viewBoxHeight = 537;

    const scaleX = rect.width / viewBoxWidth;
    const scaleY = rect.height / viewBoxHeight;

    return {
      x: (rect.left - containerRect.left) + selection.x * scaleX,
      y: (rect.top - containerRect.top) + selection.y * scaleY,
    };
  }, [selection]);

  return {
    containerRef,
    selection,
    savedLocation,
    isConfirmed,
    handleMapClick,
    confirmSelection,
    clearSelection,
    resetAll,
    getPinScreenPosition,
  };
}
