interface Table {
  id: number;
  x: number;
  y: number;
  sector: "A" | "B";
  type: "umbrella" | "table";
}

interface PoolMapSVGProps {
  className?: string;
  tables: Table[];
  selectedTableId: number | null;
  onTableClick: (table: Table) => void;
}

// Generate umbrellas (1-15) in deck + tables in green areas
export function generateTables(): Table[] {
  const tables: Table[] = [];
  
  // Deck umbrellas (1-15) - fixed positions matching reference image
  const umbrellas = [
    // Right side - 1 to 8 (top to bottom)
    { id: 1, x: 290, y: 45, sector: "B" as const },
    { id: 2, x: 290, y: 90, sector: "B" as const },
    { id: 3, x: 290, y: 135, sector: "B" as const },
    { id: 4, x: 290, y: 185, sector: "B" as const },
    { id: 5, x: 290, y: 250, sector: "B" as const },
    { id: 6, x: 290, y: 305, sector: "B" as const },
    { id: 7, x: 290, y: 370, sector: "B" as const },
    { id: 8, x: 290, y: 420, sector: "B" as const },
    // Left side - 9 to 15 (top to bottom)
    { id: 9, x: 85, y: 45, sector: "A" as const },
    { id: 10, x: 85, y: 105, sector: "A" as const },
    { id: 11, x: 85, y: 165, sector: "A" as const },
    { id: 12, x: 85, y: 235, sector: "A" as const },
    { id: 13, x: 85, y: 305, sector: "A" as const },
    { id: 14, x: 85, y: 375, sector: "A" as const },
    { id: 15, x: 85, y: 440, sector: "A" as const },
  ];
  
  umbrellas.forEach(u => {
    tables.push({ ...u, type: "umbrella" });
  });
  
  // Green area tables - small squares
  const tableSize = 18;
  const gap = 4;
  const step = tableSize + gap;
  let id = 16;
  
  // Left green area (Sector A) - x: 5 to 65, y: 35 to 465
  for (let y = 40; y <= 450; y += step) {
    for (let x = 8; x <= 50; x += step) {
      tables.push({ id: id++, x, y, sector: "A", type: "table" });
    }
  }
  
  // Right green area (Sector B) - x: 335 to 395, y: 35 to 465
  for (let y = 40; y <= 450; y += step) {
    for (let x = 338; x <= 380; x += step) {
      tables.push({ id: id++, x, y, sector: "B", type: "table" });
    }
  }
  
  return tables;
}

// Umbrella component
const Umbrella = ({ x, y, id, isSelected, onClick }: { 
  x: number; 
  y: number; 
  id: number; 
  isSelected: boolean;
  onClick: () => void;
}) => {
  const size = 28;
  const cx = x + size / 2;
  const cy = y + size / 2;
  const radius = size / 2 - 2;
  
  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={isSelected ? "#E53935" : "#D4A574"}
        stroke={isSelected ? "#B71C1C" : "#8B7355"}
        strokeWidth={isSelected ? 2 : 1}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = cx + Math.cos(rad) * radius;
        const y2 = cy + Math.sin(rad) * radius;
        return (
          <line
            key={angle}
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke={isSelected ? "#fff" : "#8B7355"}
            strokeWidth={0.8}
            opacity={0.6}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={2} fill={isSelected ? "#fff" : "#8B7355"} />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill={isSelected ? "#fff" : "#5D4037"}
        style={{ pointerEvents: "none" }}
      >
        {id}
      </text>
    </g>
  );
};

// Table square component
const TableSquare = ({ x, y, id, isSelected, onClick }: { 
  x: number; 
  y: number; 
  id: number; 
  isSelected: boolean;
  onClick: () => void;
}) => {
  const size = 18;
  
  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      <rect
        x={x}
        y={y}
        width={size}
        height={size}
        rx="2"
        ry="2"
        fill={isSelected ? "#E53935" : "#fff"}
        stroke={isSelected ? "#B71C1C" : "#558B2F"}
        strokeWidth={isSelected ? 2 : 1}
      />
      <text
        x={x + size / 2}
        y={y + size / 2 + 4}
        textAnchor="middle"
        fontSize="8"
        fontWeight="600"
        fill={isSelected ? "#fff" : "#33691E"}
        style={{ pointerEvents: "none" }}
      >
        {id}
      </text>
    </g>
  );
};

const PoolMapSVG = ({ className, tables, selectedTableId, onTableClick }: PoolMapSVGProps) => {
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
        height="260"
        rx="8"
        ry="8"
        fill="url(#poolGradient)"
      />
      
      <rect
        x="125"
        y="185"
        width="150"
        height="250"
        rx="6"
        ry="6"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Entrance/Structure at top */}
      <rect x="185" y="5" width="30" height="25" fill="#fff" stroke="#ddd" strokeWidth="1" rx="2" />

      {/* Render tables and umbrellas */}
      {tables.map((table) => (
        table.type === "umbrella" ? (
          <Umbrella
            key={table.id}
            x={table.x}
            y={table.y}
            id={table.id}
            isSelected={selectedTableId === table.id}
            onClick={() => onTableClick(table)}
          />
        ) : (
          <TableSquare
            key={table.id}
            x={table.x}
            y={table.y}
            id={table.id}
            isSelected={selectedTableId === table.id}
            onClick={() => onTableClick(table)}
          />
        )
      ))}

      {/* Pool Labels */}
      <text x="200" y="95" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff" opacity="0.8">
        PISCINA
      </text>
      <text x="200" y="315" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff" opacity="0.8">
        PISCINA
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
