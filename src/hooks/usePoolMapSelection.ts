import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";

interface SelectionData {
  x: number;
  y: number;
  sector: string | null;
  tableNumber: number | null;
}

interface SavedLocation extends SelectionData {
  timestamp: number;
}

// Define green areas as polygons (coordinates relative to viewBox 0 0 400 500)
const greenAreas = [
  {
    sector: "A",
    // Left green area
    polygon: [
      { x: 0, y: 30 },
      { x: 70, y: 0 },
      { x: 70, y: 500 },
      { x: 0, y: 470 },
    ],
  },
  {
    sector: "B",
    // Right green area
    polygon: [
      { x: 330, y: 0 },
      { x: 400, y: 30 },
      { x: 400, y: 470 },
      { x: 330, y: 500 },
    ],
  },
];

// Table positions (center coordinates and number)
const tables = [
  // Right side (1-8)
  { number: 1, x: 305, y: 60, sector: "B" },
  { number: 2, x: 305, y: 110, sector: "B" },
  { number: 3, x: 305, y: 165, sector: "B" },
  { number: 4, x: 305, y: 220, sector: "B" },
  { number: 5, x: 305, y: 280, sector: "B" },
  { number: 6, x: 305, y: 345, sector: "B" },
  { number: 7, x: 305, y: 410, sector: "B" },
  { number: 8, x: 305, y: 465, sector: "B" },
  // Left side (9-15)
  { number: 9, x: 95, y: 60, sector: "A" },
  { number: 10, x: 95, y: 110, sector: "A" },
  { number: 11, x: 95, y: 165, sector: "A" },
  { number: 12, x: 95, y: 220, sector: "A" },
  { number: 13, x: 95, y: 280, sector: "A" },
  { number: 14, x: 95, y: 345, sector: "A" },
  { number: 15, x: 95, y: 410, sector: "A" },
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

// Check if point is near a table (within radius)
function findNearestTable(x: number, y: number, radius: number = 25) {
  for (const table of tables) {
    const distance = Math.sqrt(Math.pow(x - table.x, 2) + Math.pow(y - table.y, 2));
    if (distance <= radius) {
      return table;
    }
  }
  return null;
}

export function usePoolMapSelection() {
  const [selection, setSelection] = useState<SelectionData | null>(null);
  const [savedLocation, setSavedLocation] = useState<SavedLocation | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMapClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const svg = container.querySelector("svg");
    if (!svg) return;

    // Get click position relative to SVG
    const rect = svg.getBoundingClientRect();
    
    // SVG viewBox dimensions
    const viewBoxWidth = 400;
    const viewBoxHeight = 500;
    
    // Calculate coordinates in viewBox space
    const scaleX = viewBoxWidth / rect.width;
    const scaleY = viewBoxHeight / rect.height;
    
    const mapX = (e.clientX - rect.left) * scaleX;
    const mapY = (e.clientY - rect.top) * scaleY;

    // First check if clicked on a table
    const clickedTable = findNearestTable(mapX, mapY);
    
    if (clickedTable) {
      setSelection({
        x: clickedTable.x,
        y: clickedTable.y,
        sector: `Setor ${clickedTable.sector}`,
        tableNumber: clickedTable.number,
      });
      return;
    }

    // Check if click is in any green area
    let clickedSector: string | null = null;

    for (const area of greenAreas) {
      if (isPointInPolygon(mapX, mapY, area.polygon)) {
        clickedSector = area.sector;
        break;
      }
    }

    if (clickedSector) {
      // Valid selection in green area (but not on a table)
      setSelection({
        x: mapX,
        y: mapY,
        sector: `Setor ${clickedSector}`,
        tableNumber: null,
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
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const viewBoxWidth = 400;
    const viewBoxHeight = 500;

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
