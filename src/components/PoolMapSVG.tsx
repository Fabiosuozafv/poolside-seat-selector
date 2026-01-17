import { useMemo } from "react";

interface Table {
  id: number;
  x: number;
  y: number;
  sector: "A" | "B";
}

interface PoolMapSVGProps {
  className?: string;
  tables: Table[];
  selectedTableId: number | null;
  onTableClick: (table: Table) => void;
}

// Generate tables that fit in the green areas
export function generateTables(): Table[] {
  const tables: Table[] = [];
  let id = 1;
  
  const tableSize = 22; // Size of each table square
  const gap = 6; // Gap between tables
  const step = tableSize + gap;
  
  // Left side (Sector A) - from x=10 to x=58, y=40 to y=460
  for (let y = 45; y <= 450; y += step) {
    for (let x = 12; x <= 48; x += step) {
      tables.push({ id: id++, x, y, sector: "A" });
    }
  }
  
  // Right side (Sector B) - from x=340 to x=388, y=40 to y=460
  for (let y = 45; y <= 450; y += step) {
    for (let x = 342; x <= 378; x += step) {
      tables.push({ id: id++, x, y, sector: "B" });
    }
  }
  
  return tables;
}

const PoolMapSVG = ({ className, tables, selectedTableId, onTableClick }: PoolMapSVGProps) => {
  const tableSize = 22;
  
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      style={{ width: "100%", height: "auto" }}
    >
      <defs>
        <linearGradient id="poolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4FC3F7" />
          <stop offset="100%" stopColor="#29B6F6" />
        </linearGradient>
        
        <linearGradient id="deckGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFCC80" />
          <stop offset="100%" stopColor="#FFB74D" />
        </linearGradient>
        
        <linearGradient id="grassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9CCC65" />
          <stop offset="100%" stopColor="#7CB342" />
        </linearGradient>

        <linearGradient id="selectedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF5350" />
          <stop offset="100%" stopColor="#E53935" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="400" height="500" fill="#f5f5f5" />

      {/* Left Green Area - Sector A */}
      <path
        d="M 0 30 L 70 0 L 70 500 L 0 470 Z"
        fill="url(#grassGradient)"
      />

      {/* Right Green Area - Sector B */}
      <path
        d="M 330 0 L 400 30 L 400 470 L 330 500 Z"
        fill="url(#grassGradient)"
      />

      {/* Deck Area */}
      <polygon
        points="70,0 330,0 330,500 70,500"
        fill="url(#deckGradient)"
      />

      {/* Top Pool */}
      <rect
        x="120"
        y="40"
        width="160"
        height="100"
        rx="8"
        ry="8"
        fill="url(#poolGradient)"
      />
      
      <rect
        x="125"
        y="45"
        width="150"
        height="90"
        rx="6"
        ry="6"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Bottom Pool */}
      <rect
        x="120"
        y="180"
        width="160"
        height="200"
        rx="8"
        ry="8"
        fill="url(#poolGradient)"
      />
      
      <rect
        x="125"
        y="185"
        width="150"
        height="190"
        rx="6"
        ry="6"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Entrance/Structure at top */}
      <rect x="185" y="5" width="30" height="25" fill="#fff" stroke="#ddd" strokeWidth="1" rx="2" />

      {/* Table Squares */}
      {tables.map((table) => {
        const isSelected = selectedTableId === table.id;
        return (
          <g
            key={table.id}
            onClick={(e) => {
              e.stopPropagation();
              onTableClick(table);
            }}
            style={{ cursor: "pointer" }}
          >
            <rect
              x={table.x}
              y={table.y}
              width={tableSize}
              height={tableSize}
              rx="3"
              ry="3"
              fill={isSelected ? "url(#selectedGradient)" : "#fff"}
              stroke={isSelected ? "#B71C1C" : "#8BC34A"}
              strokeWidth={isSelected ? 2 : 1}
              className="transition-all duration-200"
            />
            <text
              x={table.x + tableSize / 2}
              y={table.y + tableSize / 2 + 4}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill={isSelected ? "#fff" : "#555"}
              style={{ pointerEvents: "none" }}
            >
              {table.id}
            </text>
          </g>
        );
      })}

      {/* Pool Labels */}
      <text x="200" y="95" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff" opacity="0.8">
        PISCINA
      </text>
      <text x="200" y="285" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff" opacity="0.8">
        PISCINA
      </text>

      {/* Sector Labels */}
      <text x="35" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff" transform="rotate(-90, 35, 250)">
        SETOR A
      </text>
      <text x="365" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff" transform="rotate(90, 365, 250)">
        SETOR B
      </text>

      {/* Deck border */}
      <polygon
        points="70,0 330,0 330,500 70,500"
        fill="none"
        stroke="#E0A050"
        strokeWidth="2"
      />
    </svg>
  );
};

export default PoolMapSVG;
