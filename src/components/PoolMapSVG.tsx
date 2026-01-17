interface PoolMapSVGProps {
  className?: string;
}

const PoolMapSVG = ({ className }: PoolMapSVGProps) => {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      style={{ width: "100%", height: "auto" }}
    >
      <defs>
        {/* Gradients for visual depth */}
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

        {/* Umbrella pattern */}
        <pattern id="umbrellaPattern" width="8" height="8" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="8" y2="8" stroke="#fff" strokeWidth="1" opacity="0.3" />
        </pattern>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="400" height="500" fill="#f5f5f5" />

      {/* Left Green Area - Sector A */}
      <path
        className="green-zone"
        data-sector="A"
        d="M 0 30 L 70 0 L 70 500 L 0 470 Z"
        fill="url(#grassGradient)"
        style={{ cursor: "pointer" }}
      />

      {/* Right Green Area - Sector B */}
      <path
        className="green-zone"
        data-sector="B"
        d="M 330 0 L 400 30 L 400 470 L 330 500 Z"
        fill="url(#grassGradient)"
        style={{ cursor: "pointer" }}
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
      
      {/* Pool water effect */}
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
      
      {/* Pool water effect */}
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

      {/* Tables with Umbrellas - Left Side (9-15) */}
      {/* Table 9 */}
      <g className="table" data-table="9">
        <circle cx="95" cy="60" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="95" cy="60" r="15" fill="#fff" opacity="0.6" />
        <line x1="95" y1="45" x2="95" y2="75" stroke="#999" strokeWidth="1" />
        <line x1="80" y1="60" x2="110" y2="60" stroke="#999" strokeWidth="1" />
        <text x="95" y="64" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">9</text>
      </g>

      {/* Table 10 */}
      <g className="table" data-table="10">
        <circle cx="95" cy="110" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="95" cy="110" r="15" fill="#fff" opacity="0.6" />
        <line x1="95" y1="95" x2="95" y2="125" stroke="#999" strokeWidth="1" />
        <line x1="80" y1="110" x2="110" y2="110" stroke="#999" strokeWidth="1" />
        <text x="95" y="114" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">10</text>
      </g>

      {/* Table 11 */}
      <g className="table" data-table="11">
        <circle cx="95" cy="165" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="95" cy="165" r="15" fill="#fff" opacity="0.6" />
        <line x1="95" y1="150" x2="95" y2="180" stroke="#999" strokeWidth="1" />
        <line x1="80" y1="165" x2="110" y2="165" stroke="#999" strokeWidth="1" />
        <text x="95" y="169" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">11</text>
      </g>

      {/* Table 12 */}
      <g className="table" data-table="12">
        <circle cx="95" cy="220" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="95" cy="220" r="15" fill="#fff" opacity="0.6" />
        <line x1="95" y1="205" x2="95" y2="235" stroke="#999" strokeWidth="1" />
        <line x1="80" y1="220" x2="110" y2="220" stroke="#999" strokeWidth="1" />
        <text x="95" y="224" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">12</text>
      </g>

      {/* Table 13 */}
      <g className="table" data-table="13">
        <circle cx="95" cy="280" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="95" cy="280" r="15" fill="#fff" opacity="0.6" />
        <line x1="95" y1="265" x2="95" y2="295" stroke="#999" strokeWidth="1" />
        <line x1="80" y1="280" x2="110" y2="280" stroke="#999" strokeWidth="1" />
        <text x="95" y="284" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">13</text>
      </g>

      {/* Table 14 */}
      <g className="table" data-table="14">
        <circle cx="95" cy="345" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="95" cy="345" r="15" fill="#fff" opacity="0.6" />
        <line x1="95" y1="330" x2="95" y2="360" stroke="#999" strokeWidth="1" />
        <line x1="80" y1="345" x2="110" y2="345" stroke="#999" strokeWidth="1" />
        <text x="95" y="349" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">14</text>
      </g>

      {/* Table 15 */}
      <g className="table" data-table="15">
        <circle cx="95" cy="410" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="95" cy="410" r="15" fill="#fff" opacity="0.6" />
        <line x1="95" y1="395" x2="95" y2="425" stroke="#999" strokeWidth="1" />
        <line x1="80" y1="410" x2="110" y2="410" stroke="#999" strokeWidth="1" />
        <text x="95" y="414" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">15</text>
      </g>

      {/* Tables with Umbrellas - Right Side (1-8) */}
      {/* Table 1 */}
      <g className="table" data-table="1">
        <circle cx="305" cy="60" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="305" cy="60" r="15" fill="#fff" opacity="0.6" />
        <line x1="305" y1="45" x2="305" y2="75" stroke="#999" strokeWidth="1" />
        <line x1="290" y1="60" x2="320" y2="60" stroke="#999" strokeWidth="1" />
        <text x="305" y="64" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">1</text>
      </g>

      {/* Table 2 */}
      <g className="table" data-table="2">
        <circle cx="305" cy="110" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="305" cy="110" r="15" fill="#fff" opacity="0.6" />
        <line x1="305" y1="95" x2="305" y2="125" stroke="#999" strokeWidth="1" />
        <line x1="290" y1="110" x2="320" y2="110" stroke="#999" strokeWidth="1" />
        <text x="305" y="114" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">2</text>
      </g>

      {/* Table 3 */}
      <g className="table" data-table="3">
        <circle cx="305" cy="165" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="305" cy="165" r="15" fill="#fff" opacity="0.6" />
        <line x1="305" y1="150" x2="305" y2="180" stroke="#999" strokeWidth="1" />
        <line x1="290" y1="165" x2="320" y2="165" stroke="#999" strokeWidth="1" />
        <text x="305" y="169" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">3</text>
      </g>

      {/* Table 4 */}
      <g className="table" data-table="4">
        <circle cx="305" cy="220" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="305" cy="220" r="15" fill="#fff" opacity="0.6" />
        <line x1="305" y1="205" x2="305" y2="235" stroke="#999" strokeWidth="1" />
        <line x1="290" y1="220" x2="320" y2="220" stroke="#999" strokeWidth="1" />
        <text x="305" y="224" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">4</text>
      </g>

      {/* Table 5 */}
      <g className="table" data-table="5">
        <circle cx="305" cy="280" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="305" cy="280" r="15" fill="#fff" opacity="0.6" />
        <line x1="305" y1="265" x2="305" y2="295" stroke="#999" strokeWidth="1" />
        <line x1="290" y1="280" x2="320" y2="280" stroke="#999" strokeWidth="1" />
        <text x="305" y="284" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">5</text>
      </g>

      {/* Table 6 */}
      <g className="table" data-table="6">
        <circle cx="305" cy="345" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="305" cy="345" r="15" fill="#fff" opacity="0.6" />
        <line x1="305" y1="330" x2="305" y2="360" stroke="#999" strokeWidth="1" />
        <line x1="290" y1="345" x2="320" y2="345" stroke="#999" strokeWidth="1" />
        <text x="305" y="349" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">6</text>
      </g>

      {/* Table 7 */}
      <g className="table" data-table="7">
        <circle cx="305" cy="410" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="305" cy="410" r="15" fill="#fff" opacity="0.6" />
        <line x1="305" y1="395" x2="305" y2="425" stroke="#999" strokeWidth="1" />
        <line x1="290" y1="410" x2="320" y2="410" stroke="#999" strokeWidth="1" />
        <text x="305" y="414" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">7</text>
      </g>

      {/* Table 8 */}
      <g className="table" data-table="8">
        <circle cx="305" cy="465" r="18" fill="#E8E8E8" stroke="#ccc" strokeWidth="1" />
        <circle cx="305" cy="465" r="15" fill="#fff" opacity="0.6" />
        <line x1="305" y1="450" x2="305" y2="480" stroke="#999" strokeWidth="1" />
        <line x1="290" y1="465" x2="320" y2="465" stroke="#999" strokeWidth="1" />
        <text x="305" y="469" textAnchor="middle" fontSize="10" fontWeight="600" fill="#555">8</text>
      </g>

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
