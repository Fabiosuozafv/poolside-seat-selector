import { useState, useCallback, useMemo } from "react";
import { generateTables } from "@/components/PoolMapSVG";

interface Table {
  id: number;
  x: number;
  y: number;
  sector: "A" | "B";
}

interface SavedLocation {
  tableId: number;
  sector: string;
  timestamp: number;
}

export function usePoolMapSelection() {
  const tables = useMemo(() => generateTables(), []);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [savedLocation, setSavedLocation] = useState<SavedLocation | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleTableClick = useCallback((table: Table) => {
    setSelectedTable(table);
  }, []);

  const confirmSelection = useCallback(() => {
    if (!selectedTable) return;

    const locationData: SavedLocation = {
      tableId: selectedTable.id,
      sector: `Setor ${selectedTable.sector}`,
      timestamp: Date.now(),
    };

    localStorage.setItem("poolTableSelection", JSON.stringify(locationData));
    setSavedLocation(locationData);
    setIsConfirmed(true);
  }, [selectedTable]);

  const clearSelection = useCallback(() => {
    setSelectedTable(null);
  }, []);

  const resetAll = useCallback(() => {
    setSelectedTable(null);
    setSavedLocation(null);
    setIsConfirmed(false);
    localStorage.removeItem("poolTableSelection");
  }, []);

  return {
    tables,
    selectedTable,
    savedLocation,
    isConfirmed,
    handleTableClick,
    confirmSelection,
    clearSelection,
    resetAll,
  };
}
